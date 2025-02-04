import { Button, ButtonProps } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface ActionButtonProps extends ButtonProps {
  loading?: boolean;
  title: string;
  loaderText?: string;
  width?: string
}
const ActionButton = (props: ActionButtonProps) => {
  const { title, loading, loaderText, onClick, type, width } = props;
  return (
    <Button disabled={loading} onClick={onClick} type={type} className={`bg-primary ${width}`}>
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {loading ? loaderText : title}
    </Button>
  );
};

export default ActionButton;