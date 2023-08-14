import useId from "../hooks/useId";
import {
  Children,
  cloneElement,
  ForwardedRef,
  forwardRef,
  HTMLAttributes,
  InputHTMLAttributes,
  ReactElement,
  ReactNode,
} from "react";

interface InputProps extends HTMLAttributes<HTMLDivElement> {
  label?: ReactNode;
  children: ReactElement;
  bottomText?: string;
}

export function Input({ label, children, bottomText, ...props }: InputProps) {
  const child = Children.only(children);
  const generatedId = useId("input");
  const id = child.props.id ?? generatedId;
  const isError = child.props.error ?? false;

  return (
    <div {...props}>
      <label
        htmlFor={id}
        css={{
          fontSize: "15px",
          color: "#4e5968",
        }}
      >
        {label}
      </label>
      {cloneElement(child, {
        id,
        ...child.props,
      })}
      {bottomText != null ? (
        <p
          css={{
            color: isError ? "#e53935" : "#6b7684",
          }}
        >
          {bottomText}
        </p>
      ) : null}
    </div>
  );
}

interface TextFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  error?: boolean;
}

Input.TextField = forwardRef(
  (
    { error, ...props }: TextFieldProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <input
        css={{
          width: "100%",
          padding: "0 18px",
          fontSize: "15px",
        }}
        ref={ref}
        {...props}
      />
    );
  }
);
