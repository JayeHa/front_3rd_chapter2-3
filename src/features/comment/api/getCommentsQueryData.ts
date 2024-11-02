import { QueryKey } from "@tanstack/react-query"
import {
  commentQueryKeys,
  type FetchCommentResponse,
} from "../../../entities/comment"
import { queryClient } from "../../../shared/api"

/**
 * 댓글(comment) 쿼리 데이터를 가져오는 함수.
 * @see https://tanstack.com/query/v4/docs/reference/QueryClient/#queryclientgetqueriesdata
 */
export const getCommentsQueryData = (): [QueryKey, FetchCommentResponse] => {
  const [[queryKey, oldData]] =
    queryClient.getQueriesData<FetchCommentResponse>({
      queryKey: commentQueryKeys.lists(),
    })

  return [queryKey, { ...oldData, comments: oldData?.comments ?? [] }]
}
