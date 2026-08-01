import { useState, useEffect, useRef } from 'react'
import { Clock, Megaphone } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../ui/Button'
import { Card, CardHeader } from '../ui/Card'
import { Input } from '../../components/ui/Input'
import { Select } from '../../components/ui/Select'
import { KeywordItem } from '../../components/campaigns/KeywordItem'
import { CampaignStatus, ExecutionFrequency } from '../../enums/app.enum'
import {
  campaignSchema,
  type CampaignFormValuesSchemaType,
} from '../../features/campaigns/campaign.schema'
import type { CampaignFormData, Keyword } from '../../types/Campaign'
import type { UpdateCampaignDto } from '../../features/campaigns/campaign.types'
import type {
  CreateCampaignKeywordRepositoryDto,
  KeywordResponseDto,
} from '../../features/keywords/keyword.types'
import { useAppSelector } from '../../hooks/hooks'
import { clearUpdateCampaign, updateCampaign } from '../../features/campaigns/campaign.slice'
import { useAppDispatch } from '../../hooks/hooks'
import { CampaignKeywordStatus } from '../../enums/app.enum'
import { createCampaign, clearCreateCampaign } from '../../features/campaigns/campaign.slice'
import type { CreateCampaignDto } from '../../features/campaigns/campaign.types'

const FREQUENCY_OPTIONS = [
  { value: ExecutionFrequency.EVERY_15_MINUTES, label: 'Every 15 minutes' },
  { value: ExecutionFrequency.EVERY_30_MINUTES, label: 'Every 30 minutes' },
  { value: ExecutionFrequency.HOURLY, label: 'Hourly' },
  { value: ExecutionFrequency.DAILY, label: 'Daily' },
  { value: ExecutionFrequency.WEEKLY, label: 'Weekly' },
]

const EMPTY_FORM_VALUES: CampaignFormValuesSchemaType = {
  name: '',
  description: '',
  executionFrequency: ExecutionFrequency.HOURLY,
  dailyRecordLimit: 250,
  keywords: [],
  status: CampaignStatus.ACTIVE,
}

function createKeyword(text = '', selected = true): Keyword {
  return {
    id: crypto.randomUUID(),
    text,
    selected,
  }
}

function toUiKeywords(
  keywords?: CreateCampaignKeywordRepositoryDto[],
): Keyword[] {
  if (!keywords?.length) return [createKeyword()]
  return keywords.map((keyword) =>
    createKeyword(
      keyword.value,
      keyword.status === CampaignKeywordStatus.ACTIVE,
    ),
  )
}

function toUpdateCampaignDto(
  values: CampaignFormValuesSchemaType,
  keywords: Keyword[],
  campaignId: string,
): UpdateCampaignDto {
  return {
    id: campaignId,
    name: values.name,
    description: values.description,
    status: values.status,
    executionFrequency: values.executionFrequency,
    dailyRecordLimit: values.dailyRecordLimit,
    keywords: keywords
      .filter((keyword) => keyword.text.trim())
      .map((keyword) => ({
        value: keyword.text.trim(),
        status: keyword.selected
          ? CampaignKeywordStatus.ACTIVE
          : CampaignKeywordStatus.INACTIVE,
      })),
  }
}

function toCreateCampaignDto(
  values: CampaignFormValuesSchemaType,
  keywords: Keyword[],
): CreateCampaignDto {
  return {
    name: values.name,
    description: values.description,
    status: values.status,
    executionFrequency: values.executionFrequency,
    dailyRecordLimit: values.dailyRecordLimit,
    keywords: keywords
      .filter((keyword) => keyword.text.trim())
      .map((keyword) => ({
        value: keyword.text.trim(),
        status: keyword.selected
          ? CampaignKeywordStatus.ACTIVE
          : CampaignKeywordStatus.INACTIVE,
      })),
  }
}

interface CreateCampaignFormProps {
  initialValues?: Partial<UpdateCampaignDto>
  onSaveDraft?: (data: CampaignFormData) => void
  onCreateAndStart?: (data: CampaignFormData) => void
}

export function CreateCampaignForm({
  initialValues,
  onSaveDraft,
  onCreateAndStart,
}: CreateCampaignFormProps) {
  const [keywords, setKeywords] = useState<Keyword[]>(() =>
    toUiKeywords(initialValues?.keywords),
  )
  const editingCampaignIdRef = useRef<string>('')
  const isSubmittingRef = useRef(false)

  const { updateMode, updateCampaignDto, status, createMode } = useAppSelector(
    (state) => state.campaigns,
  )
  const dispatch = useAppDispatch()
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CampaignFormValuesSchemaType>({
    resolver: zodResolver(campaignSchema),
    defaultValues: {
      ...EMPTY_FORM_VALUES,
      name: initialValues?.name ?? '',
      description: initialValues?.description ?? '',
      executionFrequency:
        initialValues?.executionFrequency ?? ExecutionFrequency.HOURLY,
      dailyRecordLimit: initialValues?.dailyRecordLimit ?? 250,
      keywords: (initialValues?.keywords ?? []).map((keyword) =>
        keyword.value.trim(),
      ),
      status: initialValues?.status ?? CampaignStatus.ACTIVE,
    },
  })

  useEffect(() => {
    if (!updateMode || !updateCampaignDto.id) {
      editingCampaignIdRef.current = ''
      return
    }

    editingCampaignIdRef.current = updateCampaignDto.id

    const nextKeywords =
      updateCampaignDto.campaignKeywords?.length > 0
        ? updateCampaignDto.campaignKeywords.map((item: KeywordResponseDto) =>
            createKeyword(
              item.keyword.value,
              item.status === CampaignKeywordStatus.ACTIVE,
            ),
          )
        : [createKeyword()]

    setKeywords(nextKeywords)

    reset({
      name: updateCampaignDto.name,
      description: updateCampaignDto.description ?? '',
      executionFrequency: updateCampaignDto.executionFrequency,
      dailyRecordLimit: updateCampaignDto.dailyRecordLimit,
      keywords: nextKeywords
        .filter((k) => k.selected && k.text.trim())
        .map((k) => k.text.trim()),
      status: updateCampaignDto.status,
    })
  }, [updateMode, updateCampaignDto, reset])

  const resetToCreateMode = () => {
    editingCampaignIdRef.current = ''
    reset(EMPTY_FORM_VALUES)
    setKeywords([createKeyword()])
  }

  const handleCancel = () => {
    if (updateMode) {
      dispatch(clearUpdateCampaign())
      resetToCreateMode()
      return
    }
    if (createMode) {
      dispatch(clearCreateCampaign())
      resetToCreateMode()
      return
    }

    void handleSubmit((values) => onSaveDraft?.(toFormData(values)))()
  }

  const syncKeywordsToForm = (next: Keyword[]) => {
    setKeywords(next)
    setValue(
      'keywords',
      next
        .filter((keyword) => keyword.selected && keyword.text.trim())
        .map((keyword) => keyword.text.trim()),
      { shouldValidate: true },
    )
  }

  const handleToggle = (id: string) => {
    syncKeywordsToForm(
      keywords.map((keyword) =>
        keyword.id === id
          ? { ...keyword, selected: !keyword.selected }
          : keyword,
      ),
    )
  }

  const handleChange = (id: string, text: string) => {
    syncKeywordsToForm(
      keywords.map((keyword) =>
        keyword.id === id ? { ...keyword, text } : keyword,
      ),
    )
  }

  const handleRemove = (id: string) => {
    syncKeywordsToForm(keywords.filter((keyword) => keyword.id !== id))
  }

  const handleAddKeyword = () => {
    syncKeywordsToForm([...keywords, createKeyword()])
  }

  const toFormData = (
    values: CampaignFormValuesSchemaType,
  ): CampaignFormData => ({
    name: values.name,
    keywords,
    frequency: values.executionFrequency as CampaignFormData['frequency'],
    dailyRecordLimit: values.dailyRecordLimit,
  })

  const onValidSubmit = async (values: CampaignFormValuesSchemaType) => {
    if (updateMode) {
      const campaignId =
        editingCampaignIdRef.current || updateCampaignDto.id

      if (!campaignId) {
        console.error('Campaign ID is required')
        return
      }

      if (isSubmittingRef.current || status === 'loading') return
      isSubmittingRef.current = true

      try {
        await dispatch(
          updateCampaign(toUpdateCampaignDto(values, keywords, campaignId)),
        ).unwrap()
        // Slice clears updateMode + updateCampaignDto on fulfilled
        resetToCreateMode()
      } catch {
        // Toast is handled in the slice rejected case
      } finally {
        isSubmittingRef.current = false
      }
      return
    }

    if (createMode) {
      await dispatch(
        createCampaign(toCreateCampaignDto(values, keywords)),
      ).unwrap()
      dispatch(clearCreateCampaign())
      reset()
      setKeywords([createKeyword()])
      return
    }

    onCreateAndStart?.(toFormData(values))
  }

  const isUpdating = updateMode && (isSubmitting || status === 'loading')

  return (
    <Card>
      <CardHeader
        icon={<Megaphone className="size-4" />}
        title={updateMode ? 'Update campaign' : 'Create campaign'}
      />

      <form className="space-y-5" onSubmit={handleSubmit(onValidSubmit)}>
        <Input
          label="Campaign name"
          {...register('name')}
          placeholder="Enter campaign name"
        />
        {errors.name ? (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        ) : null}

        <Input
          label="Description"
          {...register('description')}
          placeholder="Enter campaign description"
        />
        {errors.description ? (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        ) : null}

        <div className="flex flex-col gap-1.5">
          <span className="text-sm text-gray-500">Keywords</span>
          <div className="space-y-2">
            {keywords.map((keyword) => (
              <KeywordItem
                key={keyword.id}
                keyword={keyword}
                onToggle={handleToggle}
                onChange={handleChange}
                onRemove={handleRemove}
                isSelected={keyword.selected}
              />
            ))}
          </div>
          {errors.keywords ? (
            <p className="text-sm text-red-500">{errors.keywords.message}</p>
          ) : null}
          <button
            type="button"
            onClick={handleAddKeyword}
            className="mt-1 w-fit text-sm font-medium text-teal-600 hover:text-teal-700"
          >
            + Add keyword
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Select
            label="Execution frequency"
            icon={<Clock className="size-4" />}
            options={FREQUENCY_OPTIONS}
            {...register('executionFrequency')}
          />

          <Input
            label="Daily record limit"
            type="number"
            min={1}
            {...register('dailyRecordLimit', { valueAsNumber: true })}
          />
        </div>
        {errors.executionFrequency ? (
          <p className="text-sm text-red-500">
            {errors.executionFrequency.message}
          </p>
        ) : null}
        {errors.dailyRecordLimit ? (
          <p className="text-sm text-red-500">
            {errors.dailyRecordLimit.message}
          </p>
        ) : null}

        {updateMode ? (
          <>
            <Input
              label="Updated by"
              value={updateCampaignDto.updatedById}
              disabled
              readOnly
            />
            <Input
              label="Updated at"
              value={
                updateCampaignDto.updatedAt
                  ? new Date(updateCampaignDto.updatedAt).toLocaleString()
                  : ''
              }
              disabled
              readOnly
            />
          </>
        ) : null}

        <div className="flex items-center justify-end gap-3 pt-1">
          <Button type="button" variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" disabled={isUpdating}>
            {isUpdating
              ? 'Updating...'
              : updateMode
                ? 'Update'
                : 'Create'}
          </Button>
        </div>
      </form>
    </Card>
  )
}
