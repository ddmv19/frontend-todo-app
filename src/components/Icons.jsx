/* eslint-disable react/prop-types */
export const DeleteIcon = ({className, onClick}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="21px"
      height="21px"
      viewBox="0 0 256 256"
      className={className}
      onClick={onClick}
    >
      <path
        fill="currentColor"
        d="M216 48h-40v-8a24 24 0 0 0-24-24h-48a24 24 0 0 0-24 24v8H40a8 8 0 0 0 0 16h8v144a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16V64h8a8 8 0 0 0 0-16M112 168a8 8 0 0 1-16 0v-64a8 8 0 0 1 16 0Zm48 0a8 8 0 0 1-16 0v-64a8 8 0 0 1 16 0Zm0-120H96v-8a8 8 0 0 1 8-8h48a8 8 0 0 1 8 8Z"
      />
    </svg>
  )
}
