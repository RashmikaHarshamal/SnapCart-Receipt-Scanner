declare module 'lucide-react' {
    import { FC, SVGProps } from 'react';

    interface IconProps extends SVGProps<SVGSVGElement> {
        size?: number | string;
        color?: string;
        strokeWidth?: number;
    }

    type Icon = FC<IconProps>;

    export const Upload: Icon;
    export const CheckCircle: Icon;
    export const XCircle: Icon;
    export const FileText: Icon;
    export const Receipt: Icon;
    export const DollarSign: Icon;
    export const TrendingUp: Icon;
    export const ShoppingBag: Icon;
    export const Calendar: Icon;
    export const Store: Icon;
    export const Search: Icon;
    export const Trash2: Icon;
    export const Edit: Icon;
    export const Eye: Icon;
}

