"use client";
import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import {
  Loader2,
  CheckCircle,
  XCircle,
  Clock,
  Calendar,
  Briefcase,
  GraduationCap,
  ChevronRight,
  User,
  MoreVertical,
  School2,
} from "lucide-react";
// Assuming Button is correctly imported from your UI library
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import { useAppUser } from "@/contexts/UserContext";

type RequestStatus = "pending" | "approved" | "rejected";

interface WorkExperience {
  company: string;
  post: string;
  timeSpanYears: number;
}
interface Qualification {
  institute: string;
  course: string;
  yearCompleted: number;
  grade: string;
}
interface InstructorRequest {
  _id: string;
  student: {
    _id: string;
    name: string;
    email: string;
  };
  name: string;
  email: string;
  experience: WorkExperience[];
  qualifications: Qualification[];
  status: RequestStatus;
  createdAt: string;
  processedBy?: {
    _id: string;
    name: string;
    email: string;
  };
  processedAt?: string;
}
interface RequestDetailModalProps {
  request: InstructorRequest;
  onClose: () => void;
}
interface RequestCardProps {
  request: InstructorRequest;
  onAction: (requestId: string, status: RequestStatus) => void;
  onShowDetails: (request: InstructorRequest) => void;
}

const RequestDetailModal: React.FC<RequestDetailModalProps> = ({
  request,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 text-white">
      <div className="bg-neutral-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 text-neutral-100">
        <div className="flex justify-between items-start border-b border-indigo-500/50 pb-3 mb-4">
          <h2 className="text-3xl font-bold text-indigo-400">
            Request Details: {request.name}
          </h2>
          <Button
            variant="ghost"
            onClick={onClose}
            className="text-gray-400 hover:text-white ml-4 p-1"
          >
            <XCircle className="w-6 h-6" />
          </Button>
        </div>
        {/* Contact Info */}
        <div className="mb-6 space-y-2 bg-neutral-700/50 p-4 rounded-lg">
          <p className="text-lg font-medium text-white flex items-center">
            <User className="w-5 h-5 mr-3 text-indigo-300 flex-shrink-0" />{" "}
            <span className="truncate">
              Applicant: {request.student.name} ({request.student.email})
            </span>
          </p>
          <div className="flex justify-between flex-wrap text-sm">
            <p className="text-gray-400 flex items-center">
              <Calendar className="w-4 h-4 mr-2" /> Applied On:
              {new Date(request.createdAt).toLocaleDateString()}
            </p>
            <p
              className={`text-sm font-semibold capitalize flex items-center ${
                request.status === "approved"
                  ? "text-green-400"
                  : request.status === "rejected"
                  ? "text-red-400"
                  : "text-yellow-400"
              }`}
            >
              <Clock className="w-4 h-4 mr-1" />
              Status: {request.status}
            </p>
          </div>
        </div>
        {/* Qualifications Section */}
        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-white border-b border-white/20 pb-1 mb-3 flex items-center">
            <GraduationCap className="w-5 h-5 mr-2 text-indigo-400" />
            Qualifications
          </h3>
          <ul className="space-y-3">
            {request.qualifications.map((q, i) => (
              <li
                key={i}
                className="bg-neutral-700 p-4 rounded-lg shadow-inner border border-neutral-600"
              >
                <p className="font-bold text-lg text-indigo-300">{q.course}</p>
                <p className="text-sm text-gray-300">
                  Institute: {q.institute}
                </p>
                <p className="text-sm text-gray-300">
                  Completed: {q.yearCompleted} (Grade: {q.grade})
                </p>
              </li>
            ))}
          </ul>
        </div>
        {/* Experience Section */}
        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-white border-b border-white/20 pb-1 mb-3 flex items-center">
            <Briefcase className="w-5 h-5 mr-2 text-indigo-400" /> Work
            Experience
          </h3>
          <ul className="space-y-3">
            {request.experience.map((e, i) => (
              <li
                key={i}
                className="bg-neutral-700 p-4 rounded-lg shadow-inner border border-neutral-600"
              >
                <p className="font-bold text-lg text-indigo-300">{e.post}</p>
                <p className="text-sm text-gray-300">Company: {e.company}</p>
                <p className="text-sm text-gray-300">
                  Duration: {e.timeSpanYears} years
                </p>
              </li>
            ))}
          </ul>
        </div>
        {/* Processed Info */}
        {(request.status === "rejected" || request.status === "approved") &&
          request?.processedBy && (
            <div className="pt-4 border-t border-neutral-700 text-sm text-gray-400">
              <p>
                Processed by:{" "}
                <span className="font-semibold text-white">
                  {request.processedBy?.name}
                </span>
              </p>
              <p>
                Processed on:{" "}
                <span className="font-semibold text-white">
                  {request?.processedAt &&
                    new Date(request?.processedAt).toLocaleDateString()}
                </span>
              </p>
            </div>
          )}
        <div className="flex justify-end pt-4">
          <Button
            onClick={onClose}
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

const DetailPopoverContent: React.FC<{
  items: WorkExperience[] | Qualification[];
  type: "exp" | "qual";
}> = ({ items, type }) => {
  const displayItems = items.slice(0, 3);
  const count = items.length;

  return (
    <div className="absolute top-full left-1/2 transform -translate-x-1/2 z-10 w-64 p-3 bg-neutral-700 border border-indigo-500 rounded-lg shadow-xl text-xs text-neutral-200 mt-2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <p className="font-bold text-indigo-300 mb-2 border-b border-indigo-500/50 pb-1">
        Top {type === "qual" ? "Qualifications" : "Experience"}:
      </p>
      {displayItems.map((item, i) => (
        <p key={i} className="truncate text-gray-300 my-1">
          <span className="font-medium text-white">
            {type === "qual" ? item.course : item.post}
          </span>{" "}
          at {type === "qual" ? item.institute : item.company}
        </p>
      ))}
      {count > 3 && (
        <p className="text-gray-400 mt-2 italic">
          ... and {count - 3} more entries.
        </p>
      )}
    </div>
  );
};

const RequestCard: React.FC<RequestCardProps> = ({
  request,
  onAction,
  onShowDetails,
}) => {
  const getStatusStyles = (status: RequestStatus) => {
    switch (status) {
      case "approved":
        return "bg-green-700/20 text-green-400 border-green-500/50 shadow-lg shadow-green-900/40";
      case "rejected":
        return "bg-red-700/20 text-red-400 border-red-500/50 shadow-lg shadow-red-900/40";
      case "pending":
      default:
        return "bg-neutral-800/50 text-amber-500 border-indigo-500/50 shadow-lg shadow-indigo-900/40";
    }
  };

  const formattedDate = new Date(request.createdAt).toLocaleDateString();

  const totalExperience = request.experience.reduce(
    (sum, exp) => sum + exp.timeSpanYears,
    0
  );
  const latestQualification = request.qualifications.sort(
    (a, b) => b.yearCompleted - a.yearCompleted
  )[0];

  return (
    <div
      className={`p-5 rounded-xl transition-all duration-300 transform hover:scale-[1.005] border ${getStatusStyles(
        request.status
      )} space-y-4`}
    >
      {/* Header (Name, Email, Status) */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start border-b border-white/10 pb-3 mb-2">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-white truncate mb-1">
            {request.name}
          </h2>
          <p className="text-sm text-indigo-300 font-medium truncate">
            {request.email}
          </p>
        </div>
        <div className="mt-3 sm:mt-0 flex items-center gap-2">
          <span
            className={`px-3 py-1 text-xs font-bold rounded-full capitalize border ${getStatusStyles(
              request.status
            ).replace("shadow-lg", "")}`}
          >
            {request.status}
          </span>
          <div className="flex items-center text-xs text-gray-400">
            <Calendar className="w-3 h-3 mr-1 flex-shrink-0" /> {formattedDate}
          </div>
        </div>
      </div>

      {/* Main Content Grid (Responsive Details) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
        {/* Qualification */}
        <div className="space-y-1">
          <div className="flex items-center text-gray-300">
            <GraduationCap className="w-5 h-5 mr-2 text-indigo-400 flex-shrink-0" />
            <span className="font-semibold text-white text-sm">
              Latest Qualification:
            </span>
          </div>
          <p className="text-sm text-gray-200 ml-7 truncate">
            {latestQualification?.course || "N/A"}
          </p>
          <div className="relative group text-indigo-400 hover:text-indigo-300 text-xs cursor-pointer inline-flex items-center ml-7 mt-1">
            <span className="underline underline-offset-2">
              View All Qualifications ({request.qualifications.length})
            </span>
            <DetailPopoverContent items={request.qualifications} type="qual" />
          </div>
        </div>

        {/* Experience */}
        <div className="space-y-1">
          <div className="flex items-center text-gray-300">
            <Briefcase className="w-5 h-5 mr-2 text-indigo-400 flex-shrink-0" />
            <span className="font-semibold text-white text-sm">
              Total Experience:
            </span>
          </div>
          <p className="text-sm text-gray-200 ml-7 truncate">
            {totalExperience} years
          </p>
          <div className="relative group text-indigo-400 hover:text-indigo-300 text-xs cursor-pointer inline-flex items-center ml-7 mt-1">
            <span className="underline underline-offset-2">
              View All Experience ({request.experience.length})
            </span>
            <DetailPopoverContent items={request.experience} type="exp" />
          </div>
        </div>

        {/* Processed Info (Only visible if processed) */}
        {(request.status === "rejected" || request.status === "approved") &&
          request?.processedBy && (
            <div className="sm:col-span-2 space-y-1 text-sm text-gray-400 pt-2 border-t border-white/10 sm:border-none sm:pt-0">
              <p className="font-semibold text-white">Processed By:</p>
              <p className="text-xs">{request.processedBy?.name}</p>
              <p className="text-xs">
                On:{" "}
                {request?.processedAt &&
                  new Date(request?.processedAt).toLocaleDateString()}
              </p>
            </div>
          )}
      </div>
      {/* Action Buttons */}
      <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row gap-3">
        <Button
          variant="outline"
          className="w-full sm:w-auto bg-neutral-700 hover:bg-neutral-600 text-white border-indigo-500 py-1 h-9 text-sm font-semibold"
          onClick={() => onShowDetails(request)}
        >
          Full Details <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
        {request.status === "pending" && (
          <>
            <Button
              variant="default"
              className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white py-1 h-9 text-sm font-semibold"
              onClick={() => onAction(request._id, "approved")}
            >
              <CheckCircle className="w-4 h-4 mr-1" /> Approve
            </Button>
            <Button
              variant="destructive"
              className="w-full sm:w-auto bg-red-600 hover:bg-red-700 py-1 h-9 text-sm font-semibold"
              onClick={() => onAction(request._id, "rejected")}
            >
              <XCircle className="w-4 h-4 mr-1" /> Reject
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

const RequestTableRow: React.FC<RequestCardProps> = ({
  request,
  onAction,
  onShowDetails,
}) => {
  const getStatusStyles = (status: RequestStatus) => {
    switch (status) {
      case "approved":
        return "bg-green-600/20 text-green-400 border-green-500";
      case "rejected":
        return "bg-red-600/20 text-red-400 border-red-500";
      case "pending":
      default:
        return "bg-amber-600/20 text-amber-400 border-amber-500";
    }
  };

  const formattedDate = new Date(request.createdAt).toLocaleDateString();
  const totalExperience = request.experience.reduce(
    (sum, exp) => sum + exp.timeSpanYears,
    0
  );

  return (
    <div className="grid grid-cols-12 md:gap-x-4 lg:gap-x-6 items-center py-3 px-3 border-b border-r border-l border-neutral-700 hover:bg-neutral-800/40 transition-colors duration-150">
      {/* 1. Name & Email */}
      <div className="col-span-3 truncate">
        <p className="font-semibold text-white truncate text-lg capitalize">
          {request.name}
        </p>
        <p className="text-indigo-300 truncate">{request.email}</p>
      </div>

      {/* education */}
      <div className="col-span-2 flex ml-4">
        <p className="flex flex-col gap-y-1 items-center">
          <span>{request.qualifications[0].course}</span>
          <span>
            <span className="font-bold">
              {request.qualifications[0].yearCompleted}{" "}
            </span>
          </span>
        </p>
        <span></span>
      </div>

      {/* 2. Experience */}

      <div className="ml-4 col-span-2 flex flex-col">
        <p className="flex flex-col gap-y-1">
          <span>{request.experience[0].company}</span>
          <span>
            {request.experience[0].post},{" "}
            <span className="font-bold">
              {request.experience[0].timeSpanYears} yrs{" "}
            </span>
          </span>
        </p>
      </div>

      {/* 4. Status */}
      <div className=" col-span-2 flex items-start flex-col gap-y-2">
        <span
          className={`px-3 py-1 text-xs font-bold rounded-full capitalize border ${getStatusStyles(
            request.status
          )}`}
        >
          {request.status}
        </span>
        <span className="flex items-center">
          <Calendar className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0 hidden lg:inline" />
          {formattedDate}
        </span>
      </div>

      <div className="col-span-1 ">
        <Button
          size="sm"
          variant="outline"
          className="bg-neutral-700 hover:bg-neutral-600 text-white border-indigo-500 h-8 px-3"
          onClick={() => onShowDetails(request)}
          title="View Details"
        >
          More
        </Button>
      </div>

      {/* 5. Actions */}
      {request.status === "pending" ? (
        <div className="col-span-2 flex flex-col gap-1.5 justify-between lg:px-5">
          <Button
            size="sm"
            className="bg-green-700 hover:bg-green-800 h-8 px- text-white"
            onClick={() => onAction(request._id, "approved")}
            title="Approve"
          >
            Approve
          </Button>

          <Button
            size="sm"
            className="bg-red-500/50 hover:bg-red-500/70 h-8 px-3 text-white"
            onClick={() => onAction(request._id, "rejected")}
            title="Reject"
          >
            Reject
          </Button>
        </div>
      ) : (
        <div className="text-gray-500 italic pr-3 capitalize">
          {request.status}
        </div>
      )}
    </div>
  );
};

function InstructorRequests() {
  const [requests, setRequests] = useState<InstructorRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeStatus, setActiveStatus] = useState<RequestStatus>("pending");
  const [showModal, setShowModal] = useState(false);
  const [selectedRequest, setSelectedRequest] =
    useState<InstructorRequest | null>(null);
  const { appUser } = useAppUser();

  const fetchRequests = async () => {
    if (!appUser?._id) return;

    setLoading(true);
    try {
      const res = await axios.get(
        `/api/instructor-request/all?adminId=${appUser._id}`
      );
      setRequests(res.data.data || []);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [appUser?._id]);

  const filteredRequests = useMemo(() => {
    return requests.filter((req) => req.status === activeStatus);
  }, [requests, activeStatus]);

  const handleAction = async (
    requestId: string,
    newStatus: "approved" | "rejected"
  ) => {
    if (!appUser?._id) {
      toast.error("Admin ID not found. Cannot process request.");
      return;
    }
    setIsProcessing(true);
    try {
      const res = await axios.post("/api/instructor-request/update-status", {
        requestId,
        adminId: appUser._id,
        status: newStatus,
      });

      if (res.data.success) {
        toast.success(`Request ${newStatus} successfully!`);
        fetchRequests();
      } else {
        throw new Error(res.data.message || "Action failed.");
      }
    } catch (error: any) {
      console.error("Action error:", error);
      toast.error(error.message || "Failed to process request.");
    } finally {
      setIsProcessing(false);
    }

    // console.log("update -stt", {
    //   requestId,
    //   adminId: appUser._id,
    //   status: newStatus,
    // });
  };

  const handleShowDetails = (request: InstructorRequest) => {
    setSelectedRequest(request);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRequest(null);
  };

  if (loading) {
    return (
      <div className="min-h-[100vh] bg-neutral-900 text-neutral-200 flex items-center justify-center">
        <Loader2 className="animate-spin w-8 h-8 text-indigo-400" />
      </div>
    );
  }

  const statusTabs: RequestStatus[] = ["pending", "approved", "rejected"];

  return (
    <main className="min-h-screen bg-neutral-900 px-4 md:px-8 py-10 text-neutral-200">
      <h1 className="text-3xl md:text-4xl font-extrabold text-indigo-400 mb-6 border-b border-indigo-500/50 pb-2">
        Instructor Requests Dashboard 🚀
      </h1>

      {/* Tab Buttons */}
      <div className="flex space-x-2 md:space-x-4 mb-8 border-b border-neutral-700 pb-2 overflow-x-auto">
        {statusTabs.map((status) => (
          <button
            key={status}
            onClick={() => setActiveStatus(status)}
            className={`px-4 py-2 text-base md:text-lg font-medium capitalize rounded-t-lg transition-colors duration-200 whitespace-nowrap ${
              activeStatus === status
                ? "bg-indigo-600 text-white shadow-lg"
                : "text-gray-400 hover:text-indigo-400 hover:bg-neutral-800"
            }`}
          >
            {status} ({requests.filter((req) => req.status === status).length})
          </button>
        ))}
      </div>

      {isProcessing && (
        <div className="flex items-center text-indigo-400 mb-4">
          <Loader2 className="animate-spin w-5 h-5 mr-2" /> Processing action...
        </div>
      )}

      {/* Responsive Content Area */}
      <div className="grid grid-cols-1 ">
        {filteredRequests.length === 0 ? (
          // No Requests Message
          <div className="col-span-1 text-center py-10 bg-neutral-800/50 rounded-lg">
            <p className="text-xl text-gray-400">
              No{" "}
              <span className="capitalize font-bold text-gray-200">
                {activeStatus}
              </span>{" "}
              requests found to become Instructor.
              <Clock className="inline w-5 h-5 ml-1" />
            </p>
          </div>
        ) : (
          <>
            {/* Table Header (Visible on large screens) */}
            <div className="hidden lg:grid grid-cols-12 md:gap-x-4 lg:gap-x-6 bg-neutral-700 text-neutral-200 font-bold py-3 px-4 border-r border-l rounded-t-lg text-sm uppercase tracking-wider">
              <div className="md:col-span-3">Applicant</div>
              <div className="md:col-span-2">Education</div>
              <div className="md:col-span-2">Experience</div>
              <div className="md:col-span-2">Status</div>
              <div className="md:col-span-1">Details</div>
              <div className="md:col-span-2 text-center">Actions</div>
            </div>

            {/* List/Table Rows */}
            <div className="space-y-4 lg:space-y-0">
              {filteredRequests.map((req) => (
                <React.Fragment key={req._id}>
                  {/* Card View for Mobile/Tablet */}
                  <div className="lg:hidden">
                    <RequestCard
                      request={req}
                      onAction={handleAction}
                      onShowDetails={handleShowDetails}
                    />
                  </div>
                  {/* Table View for Large Screens */}
                  <div className="hidden lg:block">
                    <RequestTableRow
                      request={req}
                      onAction={handleAction}
                      onShowDetails={handleShowDetails}
                    />
                  </div>
                </React.Fragment>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Detail Modal Render */}
      {showModal && selectedRequest && (
        <RequestDetailModal
          request={selectedRequest}
          onClose={handleCloseModal}
        />
      )}
    </main>
  );
}

export default InstructorRequests;
