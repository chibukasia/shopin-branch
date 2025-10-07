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
      "bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 hover:from-primary/15 hover:to-primary/10 shadow-soft hover:shadow-medium",
    success:
      "bg-gradient-to-br from-success/10 to-success/5 border-success/20 hover:from-success/15 hover:to-success/10 shadow-soft hover:shadow-medium",
    warning:
      "bg-gradient-to-br from-warning/10 to-warning/5 border-warning/20 hover:from-warning/15 hover:to-warning/10 shadow-soft hover:shadow-medium",
    danger:
      "bg-gradient-to-br from-destructive/10 to-destructive/5 border-destructive/20 hover:from-destructive/15 hover:to-destructive/10 shadow-soft hover:shadow-medium",
    neutral:
      "bg-gradient-to-br from-muted to-background border-border hover:from-muted/80 hover:to-background shadow-soft hover:shadow-medium",
  };
  return (
    <Card className={`w-56 shrink cursor-pointer border transition-all duration-300 hover:scale-105 ${variantClasses[variant]} animate-scale-in`}>
      <CardHeader className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1.5">
            <CardTitle className="text-2xl font-bold text-foreground">{title}</CardTitle>
            {subTitle && <CardTitle className="text-base font-medium text-muted-foreground">{subTitle}</CardTitle>}
            {description && <CardDescription className="text-muted-foreground">{description}</CardDescription>}
          </div>
          {icon && <div className="rounded-lg p-2 bg-background/60 shadow-sm border border-border/50">{icon}</div>}
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
              <FaArrowUp className="text-success text-sm" />
            ) : trend.value < 0 ? (
              <FaArrowDown className="text-destructive text-sm" />
            ) : (
              <FaMinus className="text-muted-foreground text-sm" />
            )}
            <span className={`text-sm font-medium ${
              trend.value > 0 ? 'text-success' : 
              trend.value < 0 ? 'text-destructive' : 
              'text-muted-foreground'
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
