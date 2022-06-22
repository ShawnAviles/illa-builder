import { forwardRef, useCallback, useState } from "react"
import dayjs from "dayjs"
import { DatePicker } from "@illa-design/date-picker"
import { Wrapper } from "@/wrappedComponents/Wrapper"
import { TooltipWrapper } from "@/wrappedComponents/TooltipWrapper"
import { InvalidMessage } from "@/wrappedComponents/InvalidMessage"
import LabelWrapper from "@/wrappedComponents/LabelWrapper"
import { inputContainerCss } from "./style"
import { WrappedDateProps } from "./interface"

export const WrappedDate = forwardRef<any, WrappedDateProps>((props, ref) => {
  const {
    value,
    tooltipText,
    dateFormat,
    placeholder,
    showClear,
    label,
    labelAlign,
    labelWidth,
    labelPosition,
    labelCaption,
    labelWidthUnit,
    required,
    colorScheme,
    minDate,
    disabled,
    maxDate,
    readOnly,
    hideValidationMessage,
    handleUpdateDsl,
  } = props

  const [currentValue, setCurrentValue] = useState(value)

  const checkRange = useCallback(
    (current) => {
      const beforeMinDate = minDate
        ? !!current?.isBefore(dayjs(minDate))
        : false
      const afterMaxDate = maxDate ? !!current?.isAfter(dayjs(maxDate)) : false
      return beforeMinDate || afterMaxDate
    },
    [minDate, maxDate],
  )

  return (
    <TooltipWrapper
      tooltipText={tooltipText}
      disabled={!tooltipText}
      position="tl"
    >
      <Wrapper alignment="fullWidth">
        <LabelWrapper
          label={label}
          labelAlign={labelAlign}
          labelWidth={labelWidth}
          labelCaption={labelCaption}
          labelWidthUnit={labelWidthUnit}
          labelPosition={labelPosition}
          required={required}
          tooltipText={tooltipText}
        >
          <div css={inputContainerCss}>
            <DatePicker
              colorScheme={colorScheme}
              format={dateFormat}
              value={value}
              readOnly={readOnly}
              disabled={disabled}
              placeholder={placeholder}
              allowClear={showClear}
              disabledDate={checkRange}
              // todo @aoao handleUpdateDsl?
              onClear={() => {
                setCurrentValue("")
                handleUpdateDsl?.({ value: "" })
              }}
              onChange={(value) => {
                setCurrentValue(value)
                handleUpdateDsl?.({ value })
              }}
            />
            <InvalidMessage
              value={currentValue}
              required={required}
              hideValidationMessage={hideValidationMessage}
            />
          </div>
        </LabelWrapper>
      </Wrapper>
    </TooltipWrapper>
  )
})

WrappedDate.displayName = "WrappedDate"

export const DateWidget = WrappedDate
