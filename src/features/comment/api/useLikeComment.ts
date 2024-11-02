import { useMutation } from "@tanstack/react-query"
import {
  commentApi,
  type FetchCommentResponse,
} from "../../../entities/comment"
import { queryClient } from "../../../shared/api"
import { getCommentsQueryData } from "./getCommentsQueryData"

/** 댓글 좋아요 */
export const useLikeComment = () => {
  return useMutation({
    mutationFn: commentApi.likeComment,
    onSuccess: (likedComment) => {
      const [queryKey, { comments }] = getCommentsQueryData()

      const newData: FetchCommentResponse = {
        comments: comments.map((comment) =>
          comment.id === likedComment.id
            ? { ...likedComment, likes: comment.likes + 1 }
            : comment,
        ),
      }

      queryClient.setQueriesData<FetchCommentResponse>({ queryKey }, newData)
    },
  })
}
