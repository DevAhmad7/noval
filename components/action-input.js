import { useDispatch } from "noval";

export default function ActionInputComponent({ callbak }) {
  const { dispatch } = useDispatch();

  return (
    <input type="text"
      onChange={(e) => callbak(dispatch, e.target.value)}
    />
  )
}