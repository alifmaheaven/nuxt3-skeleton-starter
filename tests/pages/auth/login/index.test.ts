// FILEPATH: /D:/Project/nuxt3-skeleton-starter/pages/auth/login/index.spec.js
import { mount } from "@vue/test-utils";
import { describe, expect, it, beforeEach, vi } from "vitest";
import LoginPage from "~/pages/auth/login/index.vue";
import { setActivePinia, createPinia } from "pinia";

describe("LoginPage", () => {
  // this is a global setup for all tests in this file
  vi.stubGlobal("definePageMeta", vi.fn());
  vi.stubGlobal("useNuxtApp", () => ({
    $api: vi.fn(),
  }));

  // this is a setup for each test in this file
  beforeEach(() => {
    // create a new pinia instance for each test
    setActivePinia(createPinia());
  });

  it("calls submitLogin when the form is submitted", async () => {
    const wrapper = mount(LoginPage, {
      global: {
        stubs: [
          "NuxtLink",
          "Vue3Lottie",
          "ClientOnly",
          "globalInputText",
          "globalInputPassword",
          "GlobalButton",
          "Icon",
          "UDivider",
          "UButton",
          "useNuxtApp",
        ],
      },
    });
    // spy on the submitLogin method
    const submitLogin = vi.spyOn(wrapper.vm, "submitLogin");

    // submit the form
    await wrapper.find("form").trigger("submit.prevent");

    // check if the submitLogin method was called
    expect(submitLogin).toHaveBeenCalled();
  });
});
