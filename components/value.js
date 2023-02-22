import { useMainSelector } from "@hooks/main-store";

export default function ValueComponent({ select }) {
  const value = useMainSelector(select);

  return (
    <span>{value}</span>
  )
}