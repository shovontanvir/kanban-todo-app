interface TaskTypeTitleProps {
  name: string;
  keyTitle: string;
}

const TaskTypeTitle = ({ name, keyTitle }: TaskTypeTitleProps) => {
  return (
    <div
      id={`title-${keyTitle}`}
      className={`w-full flex justify-center items-center bg-[#2d2d2d] rounded-md p-2`}
    >
      <h2 className="font-bold">{name}</h2>
    </div>
  );
};

export default TaskTypeTitle;
