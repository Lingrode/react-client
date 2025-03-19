export const ErrorMessage = ({ error = "" }: { error: string | undefined }) => {
  return (
    error && (
      <p className="text-destructive-foreground mt-2 mb-5 text-sm">{error}</p>
    )
  );
};
