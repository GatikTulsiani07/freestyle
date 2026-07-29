import { expect, test } from "@playwright/test";
import {
  missingDictationPermission,
  resolveAccessibilityPermission,
  shouldWarnAboutAccessibilityAtStartup,
} from "../src/main/permission-checks";

test("missing accessibility permission triggers a startup warning", () => {
  expect(shouldWarnAboutAccessibilityAtStartup("darwin", false, false)).toBe(
    true,
  );
});

test("granted accessibility permission does not trigger a startup warning", () => {
  expect(shouldWarnAboutAccessibilityAtStartup("darwin", false, true)).toBe(
    false,
  );
});

test("onboarding suppresses the duplicate startup warning", () => {
  expect(shouldWarnAboutAccessibilityAtStartup("darwin", true, false)).toBe(
    false,
  );
});

test("missing accessibility permission blocks dictation", () => {
  expect(missingDictationPermission("darwin", false, "granted")).toBe(
    "accessibility",
  );
});

test("denied microphone permission blocks dictation", () => {
  expect(missingDictationPermission("darwin", true, "denied")).toBe(
    "microphone",
  );
});

test("granted permissions allow dictation", () => {
  expect(missingDictationPermission("darwin", true, "granted")).toBeNull();
});

test("a stale accessibility latch cannot override current macOS trust", () => {
  expect(resolveAccessibilityPermission("darwin", false, true)).toEqual({
    granted: false,
    accessibilityConfirmed: false,
  });
});
