import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store/store";
import { fetchCrawlLogs } from "../features/crawl/crawl.slice";
import { useQuery } from "@tanstack/react-query";
import type { CrawlLogResponseDto } from "../features/crawl/crawl.types";
import type { SearchExecutionResponseDto } from "../features/search-execution/search-execution.types";
import { getSearchExecutions } from "../features/search-execution/search-execution.slice";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export const useAppSelector = useSelector.withTypes<RootState>();

export function useLogs(executionId: string) {
  const dispatch = useAppDispatch();

  return useQuery<CrawlLogResponseDto[]>({
    queryKey: ["logs", executionId],
    queryFn: () => dispatch(fetchCrawlLogs(executionId)).unwrap(),
    enabled: !!executionId,
    refetchInterval: 5000,
    retry: 3,
    staleTime: 0,
  });
}


export function useSearchExecutions(campaignId: string) {
  const dispatch = useAppDispatch();

  return useQuery<SearchExecutionResponseDto[]>({
    queryKey: ["search-executions", campaignId],
    queryFn: () => dispatch(getSearchExecutions(campaignId)).unwrap(),
    enabled: !!campaignId,
    refetchInterval: 5000,
    retry: 3,
    staleTime: 0,
  });
}