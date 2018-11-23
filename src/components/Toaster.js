import { Position, Toaster } from "@blueprintjs/core";

/** Singleton toaster instance. Create separate instances for different options. */
const MyToaster = Toaster.create({
  className: "recipe-toaster",
  position: Position.TOP
});

export const DangerToaster = message =>
  MyToaster.show({
    message,
    intent: "danger"
  });

export const SuccessToaster = message =>
  MyToaster.show({
    message,
    intent: "primary"
  });
