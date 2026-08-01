import { z } from 'zod'
import { CampaignStatus, ExecutionFrequency } from '../../enums/app.enum'

export const campaignSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    executionFrequency: z.nativeEnum(ExecutionFrequency),
    dailyRecordLimit: z.number().min(1, "Daily record limit is required"),
    keywords: z.array(z.string()).min(1, "Keywords are required"),
    status: z.nativeEnum(CampaignStatus),
});

export type CampaignFormValuesSchemaType = z.infer<typeof campaignSchema>;
