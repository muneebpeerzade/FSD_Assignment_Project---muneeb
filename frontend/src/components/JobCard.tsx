import {
  CalendarClock,
  CircleCheck,
  MousePointer,
  MousePointerClick,
  Trash,
} from "lucide-react";
export const JobCard = ({ job, onStatusChange, onDelete }) => {
  const { _id, title, company, description, status, history = [] } = job;

  const nextStatus = {
    Applied: "Reviewed",
    Reviewed: "Arrived",
    Arrived: "Completed",
  };

  const handleAdvance = () => {
    const next = nextStatus[status];
    if (next !== status) {
      onStatusChange(_id, next);
    }
  };
  function getStatusClass(status) {
    switch (status.toLowerCase()) {
      case "applied":
        return "bg-gray-700/20 text-gray-300 border border-gray-600";
      case "reviewed":
        return "bg-blue-700/20 text-blue-300 border border-blue-600";
      case "arrived":
        return "bg-green-700/20 text-green-500 border border-green-600";
      default:
        return "bg-gray-600 text-white border border-gray-500";
    }
  }
  return (
    <div className="bg-gray-800 text-gray-200 p-5 rounded-xl shadow-sm border border-gray-700 space-y-2">
      <div>
        <div className="flex gap-1">
          <h2 className="w-full">{title} </h2>
          <button
            className="hover:bg-rose-500/20 group px-4 rounded-lg"
            onClick={() => onDelete(job._id)}
          >
            <Trash className="h-6 w-6 stroke-rose-500 group-hover:stroke-rose-500 " />
          </button>
        </div>
        <p className="text-sm border border-gray-600 mt-2 w-fit px-2  rounded">
          {company}
        </p>
      </div>

      <p className="text-sm text-gray-300">{description}</p>

      <div className="flex items-end justify-between gap-2">
        <p className="text-sm font-medium">
          Status:{" "}
          <span
            className={`text-xs px-2 py-1 rounded ${getStatusClass(
              job.status
            )}`}
          >
            {job.status}
          </span>
        </p>
        <button
          onClick={handleAdvance}
          className="btn flex items-center gap-1.5 justify-center"
        >
          {nextStatus[job.status] === "Completed" ? (
            <>
              <CircleCheck className="inline-block w-4 h-4" /> {" "}
              {nextStatus[job.status]}
            </>
          ) : (
            <>
              <MousePointerClick className="inline-block w-4 h-4" /> Mark As{" "}
              {nextStatus[job.status]}
            </>
          )}
        </button>
      </div>

      <div className="pt-2 border-t border-gray-700">
        <p className="text-xs font-semibold text-gray-400 mb-1">
          Status History
        </p>
        <ul className="text-xs space-y-1">
          {[...history].reverse().map((entry, idx) => (
            <li key={idx} className="flex gap-2 items-start">
              <CalendarClock className="w-3.5 h-3.5 text-gray-500 mt-[2px]" />
              <span>
                <span className="text-gray-300 font-medium">
                  {entry.status}
                </span>{" "}
                <span className="text-gray-500 italic">
                  {new Date(entry.timestamp).toLocaleString()}
                </span>
                {entry.note && (
                  <div className="text-gray-400">Note: {entry.note}</div>
                )}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

