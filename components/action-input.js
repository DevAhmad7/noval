import { useMainDispatch } from "@hooks/main-store";

export default function ActionInputComponent({ callbak }) {
  const { dispatch } = useMainDispatch();

  return (
    <input type="text"
      onChange={(e) => callbak(dispatch, e.target.value)}
    />
  )
}