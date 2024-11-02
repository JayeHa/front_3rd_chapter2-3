import { useMutation } from "@tanstack/react-query"
import {
  postApi,
  postQueryKeys,
  type PostsResponse,
  updatePostsList,
  useAttachAuthorToPost,
} from "../../../entities/post"
import { queryClient } from "../../../shared/api"

/** 게시물 추가 */
export const useAddPostMutation = () => {
  const { attachAuthor } = useAttachAuthorToPost()

  return useMutation({
    mutationFn: postApi.addPost,
    onSuccess: async (addedPostDTO) => {
      const addedPost = attachAuthor(addedPostDTO)

      queryClient.setQueriesData<PostsResponse>(
        { queryKey: postQueryKeys.lists() },
        (oldData) => updatePostsList(oldData, addedPost, "add"),
      )
    },
  })
}
