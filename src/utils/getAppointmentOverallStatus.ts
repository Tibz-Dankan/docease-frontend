import {
  TAppointment,
  TAppointmentOverallStatus,
  TAppointmentStatus,
} from "../types/appointments";

type TStatusObject = { [key: string]: string };

const arrayToObject = (statusArray: TAppointmentStatus[]): TStatusObject => {
  const statusObject: TStatusObject = {};

  statusArray.forEach((appointmentStatus) => {
    statusObject[`${appointmentStatus.status}`] = appointmentStatus.status;
  });

  return statusObject;
};

export const getAppointmentOverallStatus = (
  appointment: TAppointment
): TAppointmentOverallStatus => {
  const statusObject: TStatusObject = arrayToObject(appointment.statuses);
  const startsAt = appointment.startsAt;
  const endsAt = appointment.endsAt;

  const isPending: boolean = statusObject["pending"] === "pending";
  const isApproved: boolean = statusObject["approved"] === "approved";
  const isDone: boolean = statusObject["done"] === "done";
  const isCancelled: boolean = statusObject["cancelled"] === "cancelled";
  const isGreaterThanStartTime: boolean =
    new Date(Date.now()) > new Date(startsAt);
  const isGreaterThanEndTime: boolean = new Date(Date.now()) > new Date(endsAt);
  const isOnGoing: boolean =
    isGreaterThanStartTime && !isGreaterThanEndTime && isApproved;
  const isExpired: boolean = isGreaterThanEndTime && !isApproved;
  const isApprovalPending: boolean = isPending && !isApproved;
  const isUpcoming: boolean = !isGreaterThanStartTime && isApproved;

  if (isCancelled) {
    return {
      overallStatus: "cancelled",
      bgColor: "bg-[#fa5252]",
      color: "text-[#fff]",
    };
  }
  if (isDone) {
    return {
      overallStatus: "done",
      bgColor: "bg-[#40c057]",
      color: "text-[#fff]",
    };
  }
  if (isExpired) {
    return {
      overallStatus: "missed",
      bgColor: "bg-[#e64980]",
      color: "text-[#fff]",
    };
  }

  if (isOnGoing) {
    return {
      overallStatus: "on going",
      bgColor: "bg-[#15aabf]",
      color: "#fff",
    };
  }
  if (isApprovalPending) {
    return {
      overallStatus: "approval pending",
      bgColor: "bg-[#868e96]",
      color: "text-[#fff]",
    };
  }

  if (isUpcoming) {
    return {
      overallStatus: "upcoming",
      bgColor: "bg-[#228be6]",
      color: "text-[#fff]",
    };
  }

  return {
    overallStatus: "approval pending",
    bgColor: "bg-[#868e96]",
    color: "text-[#fff]",
  };
};
