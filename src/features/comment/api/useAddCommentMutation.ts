import { useMutation } from "@tanstack/react-query"
import {
  commentApi,
  type FetchCommentResponse,
} from "../../../entities/comment"
import { queryClient } from "../../../shared/api"
import { getCommentsQueryData } from "./getCommentsQueryData"

/** 댓글 추가 */
export const useAddCommentMutation = () => {
  return useMutation({
    mutationFn: commentApi.addComment,
    onSuccess: (addedComment) => {
      const [queryKey, { comments }] = getCommentsQueryData()

      const newData: FetchCommentResponse = {
        comments: [...comments, addedComment],
      }

      queryClient.setQueriesData<FetchCommentResponse>({ queryKey }, newData)
    },
  })
}
