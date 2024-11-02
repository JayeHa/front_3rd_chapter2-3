import { useMutation } from "@tanstack/react-query"
import {
  postApi,
  postQueryKeys,
  type PostsResponse,
  updatePostsList,
  useAttachAuthorToPost,
} from "../../../entities/post"
import { queryClient } from "../../../shared/api"

/** 게시물 삭제 */
export const useDeletePostMutation = () => {
  const { attachAuthor } = useAttachAuthorToPost()

  return useMutation({
    mutationFn: postApi.deletePost,
    onSuccess: (deletedPostDTO) => {
      const deletedPost = attachAuthor(deletedPostDTO)

      queryClient.setQueriesData<PostsResponse>(
        { queryKey: postQueryKeys.lists() },
        (oldData) => updatePostsList(oldData, deletedPost, "delete"),
      )
    },
  })
}
