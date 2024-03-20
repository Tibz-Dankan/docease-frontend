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
      borderColor: "border-[#fa5252]",
    };
  }
  if (isDone) {
    return {
      overallStatus: "done",
      bgColor: "bg-[#40c057]",
      color: "text-[#fff]",
      borderColor: "border-[#40c057]",
    };
  }
  if (isExpired) {
    return {
      overallStatus: "missed",
      bgColor: "bg-[#e64980]",
      color: "text-[#fff]",
      borderColor: "border-[#e64980]",
    };
  }

  if (isOnGoing) {
    return {
      overallStatus: "on going",
      bgColor: "bg-[#15aabf]",
      color: "text-[#fff]",
      borderColor: "border-[#15aabf]",
    };
  }
  if (isApprovalPending) {
    return {
      overallStatus: "approval pending",
      bgColor: "bg-[#868e96]",
      color: "text-[#fff]",
      borderColor: "border-[#868e96]",
    };
  }

  if (isUpcoming) {
    return {
      overallStatus: "upcoming",
      bgColor: "bg-[#228be6]",
      color: "text-[#fff]",
      borderColor: "border-[#228be6]",
    };
  }

  return {
    overallStatus: "approval pending",
    bgColor: "bg-[#868e96]",
    color: "text-[#fff]",
    borderColor: "border-[#868e96]",
  };
};
