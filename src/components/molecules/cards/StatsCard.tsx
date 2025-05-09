import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { ReactNode } from "react";

interface StatsCardProps {
  title: string | number;
  subTitle?: string | number
  description?: string;
  content?: ReactNode;
  footer?: ReactNode;
}
const StatsCard = (props: StatsCardProps) => {
  const { title, description, content, footer, subTitle } = props;
  return (
    <Card className="w-56 shrink cursor-pointer">
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardTitle className="text-xl">{subTitle}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      {content && (
        <CardContent>
          <p className="text-xl font-semibold">{content}</p>
        </CardContent>
      )}
      {footer && (
        <CardFooter>
          <p>{footer}</p>
        </CardFooter>
      )}
    </Card>
  );
};

export default StatsCard;
