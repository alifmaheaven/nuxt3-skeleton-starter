import { mount } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";
import CustomModal from "~/components/global/modal/custom.vue";

global.ResizeObserver = class ResizeObserver {
  observe() {
    vi.fn();
  }
  unobserve() {
    vi.fn();
  }
  disconnect() {
    vi.fn();
  }
};

describe("CustomModal", () => {
  it("opens the modal when openModal is called", async () => {
    const wrapper = mount(CustomModal);
    await wrapper.vm.openModal();
    expect(wrapper.vm.isOpen).toBe(true);
  });

  it("closes the modal when closeModal is called", async () => {
    const wrapper = mount(CustomModal);
    await wrapper.vm.openModal();
    await wrapper.vm.closeModal();
    expect(wrapper.vm.isOpen).toBe(false);
  });
});
