import { useSelector } from "noval";

export default function ValueComponent({ select }) {
  const value = useSelector(select);

  return (
    <span>{value}</span>
  )
}