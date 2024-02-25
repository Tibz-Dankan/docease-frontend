import { AppDate } from "./appDate";
import { TUser } from "../types/auth";
import { IChatMessage, IOrganizedChatMessage } from "../types/chat";

class Messages {
  currentUser;
  recipient;

  constructor(currentUserObj: TUser, recipientObj: TUser) {
    this.currentUser = currentUserObj;
    this.recipient = recipientObj;
  }

  currentUserIsSender(msgObj: IChatMessage) {
    if (this.currentUser.userId === msgObj.senderId) {
      return {
        currentUserIsSender: true,
        userImageUrl: this.currentUser.imageUrl,
        username: "You",
      };
    }
    return {
      currentUserIsSender: false,
      userImageUrl: this.recipient.imageUrl,
      username: `${this.recipient.firstName} ${this.recipient.lastName}`,
    };
  }

  isPrimaryMessage(
    currentMessageObj: IChatMessage,
    prevMessageObj: IChatMessage
  ) {
    const currentSenderId = currentMessageObj.senderId;
    const prevSenderId = prevMessageObj && prevMessageObj.senderId;
    const isDifferentSender = currentSenderId !== prevSenderId;

    const currentDate = currentMessageObj.createdAt;
    const prevDate = prevMessageObj && prevMessageObj.createdAt;
    const hasDifferentMinute = this.hasDifferentMinute(prevDate, currentDate);

    if (isDifferentSender || hasDifferentMinute) {
      return {
        isPrimaryMessage: true,
      };
    }
    return {
      isPrimaryMessage: false,
    };
  }

  hasDifferentMinute(prevDate: string, currentDate: string) {
    const prevMinutes = new Date(prevDate).getMinutes();
    const currentMinutes = new Date(currentDate).getMinutes();

    if (currentMinutes !== prevMinutes) return true;
    if (currentMinutes === prevMinutes) return false;
    return false;
  }

  showTime(prevDate: string, currentDate: string) {
    return this.hasDifferentMinute(prevDate, currentDate);
  }

  hasDifferentDay(prevDate: string, currentDate: string) {
    const prevDay = prevDate && new AppDate(prevDate).day();
    const currentDay = new AppDate(currentDate).day();

    if (currentDay !== prevDay) return true;
    if (currentDay === prevDay) return false;
    return false;
  }

  showDay(prevDate: string, currentDate: string) {
    return this.hasDifferentDay(prevDate, currentDate);
  }

  organize(msgList: IChatMessage[]) {
    const organizedMessageList: IOrganizedChatMessage[] = [];
    let prevDate: string, currentDate: string; // ISODateString
    const messageList = msgList;

    messageList.map((messageObj: IChatMessage, index) => {
      const descriptors = Object.getOwnPropertyDescriptors(messageObj); //copy properties
      const msgObj: any = Object.defineProperties({}, descriptors); //create mutable object with all properties

      currentDate = messageObj.createdAt;
      prevDate = messageList[index - 1]?.createdAt;
      const prevMessageObj = messageList[index - 1];

      msgObj.isPrimaryMessage = this.isPrimaryMessage(
        messageObj,
        prevMessageObj
      ).isPrimaryMessage;
      msgObj.showTime = this.showTime(prevDate, currentDate);
      msgObj.showDay = this.showDay(prevDate, currentDate);

      const currentUserIsSender = this.currentUserIsSender(messageObj);
      msgObj.currentUserIsSender = currentUserIsSender.currentUserIsSender;
      msgObj.userImageUrl = currentUserIsSender.userImageUrl;
      msgObj.username = currentUserIsSender.username;

      organizedMessageList.push(msgObj);
    });
    return organizedMessageList;
  }
}

export default Messages;
