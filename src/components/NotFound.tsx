type NotFoundProps = {
  message?: string;
};

export function NotFound({ message }: NotFoundProps) {
  return (
    <div>
      <div className="text-6xl">404</div>
      <div className="text-2xl">{message || "Not Found"}</div>
    </div>
  );
}
