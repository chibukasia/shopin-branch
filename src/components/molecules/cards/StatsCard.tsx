import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { ReactNode } from "react";
import { FaArrowUp, FaArrowDown, FaMinus } from "react-icons/fa";

interface TrendData {
  value: number;
  period: string;
  isPositive?: boolean;
}

interface StatsCardProps {
  title: string | number;
  subTitle?: string | number
  description?: string;
  content?: ReactNode;
  footer?: ReactNode;
  icon?: ReactNode;
  variant?: "primary" | "success" | "warning" | "danger" | "neutral";
  trend?: TrendData;
}
const StatsCard = (props: StatsCardProps) => {
  const { title, description, content, footer, subTitle, icon, variant = "neutral", trend } = props;

  const variantClasses: Record<string, string> = {
    primary:
      "bg-gradient-to-br from-violet-600/10 to-violet-600/5 border-violet-600/20 hover:from-violet-600/15 hover:to-violet-600/10",
    success:
      "bg-gradient-to-br from-emerald-600/10 to-emerald-600/5 border-emerald-600/20 hover:from-emerald-600/15 hover:to-emerald-600/10",
    warning:
      "bg-gradient-to-br from-amber-600/10 to-amber-600/5 border-amber-600/20 hover:from-amber-600/15 hover:to-amber-600/10",
    danger:
      "bg-gradient-to-br from-rose-600/10 to-rose-600/5 border-rose-600/20 hover:from-rose-600/15 hover:to-rose-600/10",
    neutral:
      "bg-gradient-to-br from-muted to-background border-border hover:from-muted/80 hover:to-background",
  };
  return (
    <Card className={`w-56 shrink cursor-pointer border transition-all duration-200 hover:shadow-md ${variantClasses[variant]}`}>
      <CardHeader className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1.5">
            <CardTitle className="text-2xl">{title}</CardTitle>
            {subTitle && <CardTitle className="text-base font-medium text-muted-foreground">{subTitle}</CardTitle>}
            {description && <CardDescription>{description}</CardDescription>}
          </div>
          {icon && <div className="rounded-lg p-2 bg-background/60 shadow-sm">{icon}</div>}
        </div>
      </CardHeader>
      {content && (
        <CardContent className="pt-2 px-5 pb-5">
          <p className="text-xl font-semibold">{content}</p>
        </CardContent>
      )}
      {trend && (
        <CardContent className="pt-0 px-5 pb-2">
          <div className="flex items-center gap-2">
            {trend.value > 0 ? (
              <FaArrowUp className="text-green-600 text-sm" />
            ) : trend.value < 0 ? (
              <FaArrowDown className="text-red-600 text-sm" />
            ) : (
              <FaMinus className="text-gray-600 text-sm" />
            )}
            <span className={`text-sm font-medium ${
              trend.value > 0 ? 'text-green-600' : 
              trend.value < 0 ? 'text-red-600' : 
              'text-gray-600'
            }`}>
              {Math.abs(trend.value)}%
            </span>
            <span className="text-xs text-muted-foreground">
              vs {trend.period}
            </span>
          </div>
        </CardContent>
      )}
      {footer && (
        <CardFooter className="pt-0 px-5 pb-5">
          <p>{footer}</p>
        </CardFooter>
      )}
    </Card>
  );
};

export default StatsCard;
