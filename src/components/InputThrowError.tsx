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
  label: ReactNode;
  children: ReactElement;
  bottomText?: string;
}

export function InputThrowError({
  label,
  children,
  bottomText,
  ...props
}: InputProps) {
  const child = Children.only(children);
  if (!child.props.id) {
    throw new Error(
      "<Input.TextField /> 컴포넌트는 반드시 id를 prop으로 전달 받아야 합니다."
    );
  }
  const isError = child.props.error ?? false;

  return (
    <div {...props}>
      <label
        htmlFor={child.props.id}
        css={{
          fontSize: "15px",
          color: "#4e5968",
        }}
      >
        {label}
      </label>
      {cloneElement(child, {
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

InputThrowError.TextField = forwardRef(
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
