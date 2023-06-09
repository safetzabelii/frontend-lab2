import * as signalR from "@microsoft/signalr";
import { NotificationModel } from "../models/Notification/NotificationModel";

class SignalRService {
  private hubConnection: signalR.HubConnection | null = null;
  private notifications: NotificationModel[] = [];

  startConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:7061/notificationhub")
      .build();

    this.hubConnection.start().then(() => {
      console.log("SignalR connection started");
    }).catch((error) => {
      console.log("Error starting SignalR connection: ", error);
    });
  }

  stopConnection() {
    if (this.hubConnection) {
      this.hubConnection.stop();
      console.log("SignalR connection stopped");
    }
  }

  listenForNotifications(callback: (notification: NotificationModel) => void) {
    if (this.hubConnection) {
      this.hubConnection.on("NewNotification", callback);
    }
  }

  // Get the array of notifications
  getNotifications() {
    return this.notifications;
  }
}

export default SignalRService;
