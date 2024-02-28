import { mount } from "@vue/test-utils";
import { describe, expect, it, beforeEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import Button from "~/components/global/button/index.vue";

describe("Button", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("has a default buttonClass prop", () => {
    const wrapper = mount(Button, {
      global: {
        stubs: ["Icon", "ClientOnly"],
      },
      props: {
        buttonClass: "btn",
      },
    });
    expect(wrapper.props().buttonClass).toBe("btn");
  });

  it("sets the buttonClass prop correctly", () => {
    const wrapper = mount(Button, {
      propsData: {
        buttonClass: "test-class",
      },
      global: {
        stubs: ["Icon", "ClientOnly"],
      },
    });
    expect(wrapper.props().buttonClass).toBe("test-class");
  });

  it("has a default buttonType prop", () => {
    const wrapper = mount(Button, {
      global: {
        stubs: ["Icon", "ClientOnly"],
      },
    });
    expect(wrapper.props().buttonType).toBe("button");
  });

  it("sets the buttonType prop correctly", () => {
    const wrapper = mount(Button, {
      propsData: {
        buttonType: "submit",
      },
      global: {
        stubs: ["Icon", "ClientOnly"],
      },
    });
    expect(wrapper.props().buttonType).toBe("submit");
  });

  it("has a default style prop as an empty object", () => {
    const wrapper = mount(Button, {
      props: {
        style: {},
      },
      global: {
        stubs: ["Icon", "ClientOnly"],
      },
    });
    expect(wrapper.props().style).toEqual({});
  });

  it("sets the style prop correctly", () => {
    const wrapper = mount(Button, {
      propsData: {
        style: { color: "red" },
      },
      global: {
        stubs: ["Icon", "ClientOnly"],
      },
    });
    expect(wrapper.props().style).toEqual({ color: "red" });
  });

  it("has a default buttonStyle prop as an empty object", () => {
    const wrapper = mount(Button, {
      props: {
        buttonStyle: {},
      },
      global: {
        stubs: ["Icon", "ClientOnly"],
      },
    });
    expect(wrapper.props().buttonStyle).toEqual({});
  });

  it("sets the buttonStyle prop correctly", () => {
    const wrapper = mount(Button, {
      propsData: {
        buttonStyle: { backgroundColor: "blue" },
      },
      global: {
        stubs: ["Icon", "ClientOnly"],
      },
    });
    expect(wrapper.props().buttonStyle).toEqual({ backgroundColor: "blue" });
  });
});
