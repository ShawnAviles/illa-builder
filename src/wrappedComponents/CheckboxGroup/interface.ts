import { CheckboxGroupProps } from "@illa-design/checkbox"
import LabelProps from "@/wrappedComponents/Label/interface"
import { TooltipWrapperProps } from "@/wrappedComponents/TooltipWrapper/interface"

export interface WrappedCheckboxGroupProps
  extends Pick<
      CheckboxGroupProps,
      "value" | "disabled" | "options" | "direction" | "defaultValue"
    >,
    Pick<TooltipWrapperProps, "tooltipText">,
    LabelProps {
  itemMode?: "dynamic" | "static"
  handleUpdateDsl: (value: Record<string, any>) => void
}
