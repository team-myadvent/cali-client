import InActive1Icon from "@/components/common/icons/cardNumber/InActive1Icon";
import InActive2Icon from "@/components/common/icons/cardNumber/InActive2Icon";
import InActive3Icon from "@/components/common/icons/cardNumber/InActive3Icon";
import InActive4Icon from "@/components/common/icons/cardNumber/InActive4Icon";
import InActive5Icon from "@/components/common/icons/cardNumber/InActive5Icon";
import InActive6Icon from "@/components/common/icons/cardNumber/InActive6Icon";
import InActive7Icon from "@/components/common/icons/cardNumber/InActive7Icon";
import InActive8Icon from "@/components/common/icons/cardNumber/InActive8Icon";
import InActive9Icon from "@/components/common/icons/cardNumber/InActive9Icon";
import InActive10Icon from "@/components/common/icons/cardNumber/InActive10Icon";
import InActive11Icon from "@/components/common/icons/cardNumber/InActive11Icon";
import InActive12Icon from "@/components/common/icons/cardNumber/InActive12Icon";
import InActive13Icon from "@/components/common/icons/cardNumber/InActive13Icon";
import InActive14Icon from "@/components/common/icons/cardNumber/InActive14Icon";
import InActive15Icon from "@/components/common/icons/cardNumber/InActive15Icon";
import InActive16Icon from "@/components/common/icons/cardNumber/InActive16Icon";
import InActive17Icon from "@/components/common/icons/cardNumber/InActive17Icon";
import InActive18Icon from "@/components/common/icons/cardNumber/InActive18Icon";
import InActive19Icon from "@/components/common/icons/cardNumber/InActive19Icon";
import InActive20Icon from "@/components/common/icons/cardNumber/InActive20Icon";
import InActive21Icon from "@/components/common/icons/cardNumber/InActive21Icon";
import InActive22Icon from "@/components/common/icons/cardNumber/InActive22Icon";
import InActive23Icon from "@/components/common/icons/cardNumber/InActive23Icon";
import InActive24Icon from "@/components/common/icons/cardNumber/InActive24Icon";
import InActive25Icon from "@/components/common/icons/cardNumber/InActive25Icon";

import Active1Icon from "@/components/common/icons/cardNumber/Active1Icon";
import Active2Icon from "@/components/common/icons/cardNumber/Active2Icon";
import Active3Icon from "@/components/common/icons/cardNumber/Active3Icon";
import Active4Icon from "@/components/common/icons/cardNumber/Active4Icon";
import Active5Icon from "@/components/common/icons/cardNumber/Active5Icon";
import Active6Icon from "@/components/common/icons/cardNumber/Active6Icon";
import Active7Icon from "@/components/common/icons/cardNumber/Active7Icon";
import Active8Icon from "@/components/common/icons/cardNumber/Active8Icon";
import Active9Icon from "@/components/common/icons/cardNumber/Active9Icon";
import Active10Icon from "@/components/common/icons/cardNumber/Active10Icon";
import Active11Icon from "@/components/common/icons/cardNumber/Active11Icon";
import Active12Icon from "@/components/common/icons/cardNumber/Active12Icon";
import Active13Icon from "@/components/common/icons/cardNumber/Active13Icon";
import Active14Icon from "@/components/common/icons/cardNumber/Active14Icon";
import Active15Icon from "@/components/common/icons/cardNumber/Active15Icon";
import Active16Icon from "@/components/common/icons/cardNumber/Active16Icon";
import Active17Icon from "@/components/common/icons/cardNumber/Active17Icon";
import Active18Icon from "@/components/common/icons/cardNumber/Active18Icon";
import Active19Icon from "@/components/common/icons/cardNumber/Active19Icon";
import Active20Icon from "@/components/common/icons/cardNumber/Active20Icon";
import Active21Icon from "@/components/common/icons/cardNumber/Active21Icon";
import Active22Icon from "@/components/common/icons/cardNumber/Active22Icon";
import Active23Icon from "@/components/common/icons/cardNumber/Active23Icon";
import Active24Icon from "@/components/common/icons/cardNumber/Active24Icon";
import Active25Icon from "@/components/common/icons/cardNumber/Active25Icon";
import { SVGProps } from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  variant?: "default" | "detail";
}

export interface IconMapType {
  [key: number]: React.FC<IconProps>;
}

export const ActiveIcons: IconMapType = {
  1: Active1Icon,
  2: Active2Icon,
  3: Active3Icon,
  4: Active4Icon,
  5: Active5Icon,
  6: Active6Icon,
  7: Active7Icon,
  8: Active8Icon,
  9: Active9Icon,
  10: Active10Icon,
  11: Active11Icon,
  12: Active12Icon,
  13: Active13Icon,
  14: Active14Icon,
  15: Active15Icon,
  16: Active16Icon,
  17: Active17Icon,
  18: Active18Icon,
  19: Active19Icon,
  20: Active20Icon,
  21: Active21Icon,
  22: Active22Icon,
  23: Active23Icon,
  24: Active24Icon,
  25: Active25Icon,
};

export const InactiveIcons: IconMapType = {
  1: InActive1Icon,
  2: InActive2Icon,
  3: InActive3Icon,
  4: InActive4Icon,
  5: InActive5Icon,
  6: InActive6Icon,
  7: InActive7Icon,
  8: InActive8Icon,
  9: InActive9Icon,
  10: InActive10Icon,
  11: InActive11Icon,
  12: InActive12Icon,
  13: InActive13Icon,
  14: InActive14Icon,
  15: InActive15Icon,
  16: InActive16Icon,
  17: InActive17Icon,
  18: InActive18Icon,
  19: InActive19Icon,
  20: InActive20Icon,
  21: InActive21Icon,
  22: InActive22Icon,
  23: InActive23Icon,
  24: InActive24Icon,
  25: InActive25Icon,
};
