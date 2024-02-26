import { url } from "../../store/index";

export const postSchedule = async ({
  userId,
  weekday,
  token,
}: {
  userId: string;
  weekday: string;
  token: string;
}) => {
  const response = await fetch(`${url}/schedules/post`, {
    method: "POST",
    body: JSON.stringify({
      userId: userId,
      weekday: weekday,
    }),
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return await response.json();
};

export const getScheduleByUser = async ({
  userId,
  token,
}: {
  userId: string;
  token: string;
}) => {
  const response = await fetch(
    `${url}/schedules/get-by-user?userId=${userId}`,
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return await response.json();
};

export const deleteSchedule = async ({
  scheduleId,
  token,
}: {
  scheduleId: string;
  token: string;
}) => {
  const response = await fetch(`${url}/schedules/delete/${scheduleId}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return await response.json();
};

export const postScheduleTime = async ({
  scheduleId,
  start,
  end,
  token,
}: {
  scheduleId: string;
  start: string;
  end: string;
  token: string;
}) => {
  const response = await fetch(`${url}/schedules/post-schedule-time`, {
    method: "POST",
    body: JSON.stringify({
      scheduleId,
      start,
      end,
    }),
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return await response.json();
};

export const updateScheduleTime = async ({
  scheduleTimeId,
  start,
  end,
  token,
}: {
  scheduleTimeId: string;
  start: string;
  end: string;
  token: string;
}) => {
  const response = await fetch(`${url}/schedules/update-schedule-time`, {
    method: "PATCH",
    body: JSON.stringify({
      scheduleTimeId,
      start,
      end,
    }),
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return await response.json();
};

export const deleteScheduleTime = async ({
  scheduleTimeId,
  token,
}: {
  scheduleTimeId: string;
  token: string;
}) => {
  const response = await fetch(`${url}/schedules/delete-schedule-time`, {
    method: "DELETE",
    body: JSON.stringify({
      scheduleTimeId,
    }),
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return await response.json();
};
