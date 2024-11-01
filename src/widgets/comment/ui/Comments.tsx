import { Edit2, Plus, Trash2 } from "lucide-react"
import { useState } from "react"
import { useCommentsQuery } from "../../../entities/comment/api/useCommentsQuery"
import { Comment, NewComment } from "../../../entities/comment/model/types"
import { usePostQueryParams } from "../../../entities/post"
import { Post } from "../../../entities/post/model/types"
import {
  CommentAddButton,
  CommentLikeButton,
  CommentUpdateButton,
  useDeleteComment,
} from "../../../features/comment"
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Textarea,
  TextHighlighter,
} from "../../../shared/ui"

type Props = {
  postId: Post["id"]
}

export const Comments = ({ postId }: Props) => {
  const {
    queryParams: { search: searchQuery },
  } = usePostQueryParams()

  const [selectedComment, setSelectedComment] = useState<Comment | null>(null)
  const [newComment, setNewComment] = useState<NewComment>({
    body: "",
    postId: null,
    userId: 1,
  })

  const [showAddCommentDialog, setShowAddCommentDialog] = useState(false)
  const [showEditCommentDialog, setShowEditCommentDialog] = useState(false)

  const { data: comments = [] } = useCommentsQuery(postId)

  const { mutate: deleteComment } = useDeleteComment()

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">댓글</h3>
        <Button
          size="sm"
          onClick={() => {
            setNewComment((prev) => ({ ...prev, postId }))
            setShowAddCommentDialog(true)
          }}
        >
          <Plus className="w-3 h-3 mr-1" />
          댓글 추가
        </Button>
      </div>
      <div className="space-y-1">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="flex items-center justify-between text-sm border-b pb-1"
          >
            <div className="flex items-center space-x-2 overflow-hidden">
              <span className="font-medium truncate">
                {comment.user.username}:
              </span>
              <span className="truncate">
                <TextHighlighter text={comment.body} highlight={searchQuery} />
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <CommentLikeButton comment={comment} />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSelectedComment(comment)
                  setShowEditCommentDialog(true)
                }}
              >
                <Edit2 className="w-3 h-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => deleteComment(comment.id)}
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* 댓글 추가 대화상자 */}
      <Dialog
        open={showAddCommentDialog}
        onOpenChange={setShowAddCommentDialog}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>새 댓글 추가</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              placeholder="댓글 내용"
              value={newComment.body}
              onChange={(e) =>
                setNewComment({ ...newComment, body: e.target.value })
              }
            />
            <CommentAddButton
              newComment={newComment}
              onAddSuccess={() => {
                setShowAddCommentDialog(false)
                setNewComment({ body: "", postId: null, userId: 1 })
              }}
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* 댓글 수정 대화상자 */}
      <Dialog
        open={showEditCommentDialog}
        onOpenChange={setShowEditCommentDialog}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>댓글 수정</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              placeholder="댓글 내용"
              value={selectedComment?.body || ""}
              onChange={(e) => {
                if (selectedComment) {
                  setSelectedComment({
                    ...selectedComment,
                    body: e.target.value,
                  })
                }
              }}
            />
            <CommentUpdateButton
              selectedComment={selectedComment}
              onUpdateSuccess={() => {
                setShowEditCommentDialog(false)
              }}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
