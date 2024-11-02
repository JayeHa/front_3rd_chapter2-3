import { useMutation } from "@tanstack/react-query"
import {
  postApi,
  postQueryKeys,
  PostsResponse,
  updatePostsList,
  useAttachAuthorToPost,
} from "../../../entities/post"
import { queryClient } from "../../../shared/api"

/** 게시물 업데이트 */
export const useUpdatePostMutation = () => {
  const { attachAuthor } = useAttachAuthorToPost()

  return useMutation({
    mutationFn: postApi.updatePost,
    onSuccess: (updatedPostDTO) => {
      const updatedPost = attachAuthor(updatedPostDTO)

      queryClient.setQueriesData<PostsResponse>(
        { queryKey: postQueryKeys.lists() },
        (oldData) => updatePostsList(oldData, updatedPost, "update"),
      )
    },
  })
}
