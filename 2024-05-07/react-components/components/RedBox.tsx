type RedBoxProps = {
  children: React.ReactNode;
};
export default function RedBox({ children }: RedBoxProps) {
  return <div className="red-box">{children}</div>;
}
