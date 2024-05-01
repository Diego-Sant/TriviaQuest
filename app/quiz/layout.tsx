type Props = {
    children: React.ReactNode;
}

const QuizLayout = ({ children }: Props) => {
  return (
    <div className="flex flex-col h-full text-white">
      <div className="flex flex-col h-full w-full">
        {children}
      </div>
    </div>
  )
}

export default QuizLayout
