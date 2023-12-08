<script setup>
import { computed, toRef, useSlots } from "vue";
import { useField } from "vee-validate";

import { EditorContent, Editor, Extension } from "@tiptap/vue-3";
import { Highlight } from "@tiptap/extension-highlight";
import { TextAlign } from "@tiptap/extension-text-align";
import Gapcursor from "@tiptap/extension-gapcursor";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import StarterKit from "@tiptap/starter-kit";

const emit = defineEmits();
const props = defineProps({
  value: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: false,
  },
  placeholder: {
    type: String,
    default: "",
  },
  icon: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  primary: {
    type: Boolean,
    default: false,
  },
  inline: {
    type: Boolean,
    default: false,
  },
});

const editor = ref();
const name = toRef(props, "name");

const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
  meta,
} = useField(name);

var valueChange = computed({
  get: () => inputValue.value,
  set: (val) => {
    handleChange(val);
    emit("update:value", val);
  },
});

watch(
  () => valueChange.value,
  (value) => {
    const isSame = editor.value.getHTML() === value;
    if (!isSame) {
      editor.value.commands.setContent(value, false);
    }
  },
);

const is_main_navbar = computed(() => {
  return !editor.value.isActive("table");
});

onMounted(() => {
  editor.value = new Editor({
    // element: document.querySelector('.element'),
    content: ``,
    extensions: [
      StarterKit,
      Highlight,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Gapcursor,
      // Table.configure({
      //   resizable: true,
      //   // HTMLAttributes: {
      //   //   class: 'my-custom-class',
      //   // },
      // }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    autofocus: true,
    editable: true,
    injectCSS: false,
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none",
      },
    },
    onUpdate: () => {
      // emit('update:modelValue', editor.value?.getHTML())
      valueChange.value = editor.value?.getHTML();
    },
  });
});

onBeforeUnmount(() => {
  editor.value?.destroy();
  // editor.value = null
});
</script>

<template>
  <div v-if="editor" class="rounded-md border border-gray-300 p-1">
    <div v-if="is_main_navbar" class="flex gap-1">
      <UTooltip text="Bold">
        <UButton
          color="primary"
          :variant="editor.isActive('bold') ? 'solid' : 'outline'"
          @click="editor.chain().focus().toggleBold().run()"
        >
          <Icon name="material-symbols:format-bold" />
        </UButton>
      </UTooltip>

      <UTooltip text="Italic">
        <UButton
          color="primary"
          :variant="editor.isActive('italic') ? 'solid' : 'outline'"
          @click="editor.chain().focus().toggleItalic().run()"
        >
          <Icon name="material-symbols:format-italic" />
        </UButton>
      </UTooltip>

      <UTooltip text="Strike">
        <UButton
          color="primary"
          :variant="editor.isActive('strike') ? 'solid' : 'outline'"
          @click="editor.chain().focus().toggleStrike().run()"
        >
          <Icon name="material-symbols:format-strikethrough" />
        </UButton>
      </UTooltip>

      <UTooltip text="Clear">
        <UButton
          color="primary"
          :variant="editor.isActive('clear') ? 'solid' : 'outline'"
          @click="editor.chain().focus().unsetAllMarks().run()"
        >
          <Icon name="material-symbols:format-clear" />
        </UButton>
      </UTooltip>

      <div class="flex items-center justify-center">
        <Icon name="clarity:ellipsis-vertical-line" />
      </div>

      <UTooltip text="Paragraph">
        <UButton
          color="primary"
          :variant="editor.isActive('paragraph') ? 'solid' : 'outline'"
          @click="editor.chain().focus().setParagraph().run()"
        >
          <Icon name="material-symbols:format-paragraph" />
        </UButton>
      </UTooltip>

      <UTooltip text="Heading 1">
        <UButton
          color="primary"
          :variant="
            editor.isActive('heading', { level: 1 }) ? 'solid' : 'outline'
          "
          @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
        >
          <Icon name="material-symbols:format-h1" />
        </UButton>
      </UTooltip>

      <UTooltip text="Heading 2">
        <UButton
          color="primary"
          :variant="
            editor.isActive('heading', { level: 2 }) ? 'solid' : 'outline'
          "
          @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
        >
          <Icon name="material-symbols:format-h2" />
        </UButton>
      </UTooltip>

      <UTooltip text="Heading 3">
        <UButton
          color="primary"
          :variant="
            editor.isActive('heading', { level: 3 }) ? 'solid' : 'outline'
          "
          @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
        >
          <Icon name="material-symbols:format-h3" />
        </UButton>
      </UTooltip>

      <UTooltip text="Heading 4">
        <UButton
          color="primary"
          :variant="
            editor.isActive('heading', { level: 4 }) ? 'solid' : 'outline'
          "
          @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
        >
          <Icon name="material-symbols:format-h4" />
        </UButton>
      </UTooltip>

      <UTooltip text="Heading 5">
        <UButton
          color="primary"
          :variant="
            editor.isActive('heading', { level: 5 }) ? 'solid' : 'outline'
          "
          @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
        >
          <Icon name="material-symbols:format-h5" />
        </UButton>
      </UTooltip>

      <UTooltip text="Heading 6">
        <UButton
          color="primary"
          :variant="
            editor.isActive('heading', { level: 6 }) ? 'solid' : 'outline'
          "
          @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
        >
          <Icon name="material-symbols:format-h6" />
        </UButton>
      </UTooltip>

      <div class="flex items-center justify-center">
        <Icon name="clarity:ellipsis-vertical-line" />
      </div>

      <UTooltip text="Bullet List">
        <UButton
          color="primary"
          :variant="editor.isActive('bulletList') ? 'solid' : 'outline'"
          @click="editor.chain().focus().toggleBulletList().run()"
        >
          <Icon name="material-symbols:format-list-bulleted" />
        </UButton>
      </UTooltip>

      <UTooltip text="Order List">
        <UButton
          color="primary"
          :variant="editor.isActive('orderedList') ? 'solid' : 'outline'"
          @click="editor.chain().focus().toggleOrderedList().run()"
        >
          <Icon name="material-symbols:format-list-numbered" />
        </UButton>
      </UTooltip>

      <div class="flex items-center justify-center">
        <Icon name="clarity:ellipsis-vertical-line" />
      </div>

      <UTooltip text="Code">
        <UButton
          color="primary"
          :variant="editor.isActive('code') ? 'solid' : 'outline'"
          @click="editor.chain().focus().toggleCode().run()"
        >
          <Icon name="material-symbols:code" />
        </UButton>
      </UTooltip>

      <UTooltip text="Code Block">
        <UButton
          color="primary"
          :variant="editor.isActive('codeBlock') ? 'solid' : 'outline'"
          @click="editor.chain().focus().toggleCodeBlock().run()"
        >
          <Icon name="material-symbols:code" />
        </UButton>
      </UTooltip>

      <UTooltip text="Horizontal Rule">
        <UButton
          color="primary"
          :variant="editor.isActive('horizontalRule') ? 'solid' : 'outline'"
          @click="editor.chain().focus().setHorizontalRule().run()"
        >
          <Icon name="material-symbols:horizontal-rule" />
        </UButton>
      </UTooltip>

      <div class="flex items-center justify-center">
        <Icon name="clarity:ellipsis-vertical-line" />
      </div>

      <UTooltip text="Highlight">
        <UButton
          color="primary"
          :variant="editor.isActive('highlight') ? 'solid' : 'outline'"
          @click="editor.chain().focus().toggleHighlight().run()"
        >
          <Icon name="material-symbols:highlight" />
        </UButton>
      </UTooltip>

      <UTooltip text="Blockquote">
        <UButton
          color="primary"
          :variant="editor.isActive('blockquote') ? 'solid' : 'outline'"
          @click="editor.chain().focus().toggleBlockquote().run()"
        >
          <Icon name="material-symbols:format-quote" />
        </UButton>
      </UTooltip>

      <div class="flex items-center justify-center">
        <Icon name="clarity:ellipsis-vertical-line" />
      </div>

      <UTooltip text="Align Left">
        <UButton
          color="primary"
          :variant="
            editor.isActive({ textAlign: 'left' }) ? 'solid' : 'outline'
          "
          @click="editor.chain().focus().setTextAlign('left').run()"
        >
          <Icon name="material-symbols:format-align-left" />
        </UButton>
      </UTooltip>

      <UTooltip text="Align Center">
        <UButton
          color="primary"
          :variant="
            editor.isActive({ textAlign: 'center' }) ? 'solid' : 'outline'
          "
          @click="editor.chain().focus().setTextAlign('center').run()"
        >
          <Icon name="material-symbols:format-align-center" />
        </UButton>
      </UTooltip>

      <UTooltip text="Align Right">
        <UButton
          color="primary"
          :variant="
            editor.isActive({ textAlign: 'right' }) ? 'solid' : 'outline'
          "
          @click="editor.chain().focus().setTextAlign('right').run()"
        >
          <Icon name="material-symbols:format-align-right" />
        </UButton>
      </UTooltip>

      <UTooltip text="Align Justify">
        <UButton
          color="primary"
          :variant="
            editor.isActive({ textAlign: 'justify' }) ? 'solid' : 'outline'
          "
          @click="editor.chain().focus().setTextAlign('justify').run()"
        >
          <Icon name="material-symbols:format-align-justify" />
        </UButton>
      </UTooltip>

      <div class="flex items-center justify-center">
        <Icon name="clarity:ellipsis-vertical-line" />
      </div>

      <UTooltip text="Table">
        <UButton
          color="primary"
          :variant="editor.isActive('table') ? 'solid' : 'outline'"
          @click="
            editor.commands.insertTable({
              rows: 3,
              cols: 3,
              withHeaderRow: true,
            })
          "
        >
          <Icon name="material-symbols:table" />
        </UButton>
      </UTooltip>

      <hr class="separator" />

      <UTooltip text="Undo">
        <UButton
          color="primary"
          :disabled="!editor.can().chain().focus().undo().run()"
          @click="editor.chain().focus().undo().run()"
        >
          <Icon name="material-symbols:undo" />
        </UButton>
      </UTooltip>

      <UTooltip text="Redo">
        <UButton
          color="primary"
          :disabled="!editor.can().chain().focus().redo().run()"
          @click="editor.chain().focus().redo().run()"
        >
          <Icon name="material-symbols:redo" />
        </UButton>
      </UTooltip>
    </div>
    <div v-if="editor.isActive('table')" id="table_nav" class="flex gap-1">
      <UTooltip text="Bold">
        <UButton
          color="primary"
          :variant="editor.isActive('bold') ? 'solid' : 'outline'"
          @click="editor.chain().focus().toggleBold().run()"
        >
          <Icon name="material-symbols:format-bold" />
        </UButton>
      </UTooltip>

      <UTooltip text="Italic">
        <UButton
          color="primary"
          :variant="editor.isActive('italic') ? 'solid' : 'outline'"
          @click="editor.chain().focus().toggleItalic().run()"
        >
          <Icon name="material-symbols:format-italic" />
        </UButton>
      </UTooltip>

      <UTooltip text="Strike">
        <UButton
          color="primary"
          :variant="editor.isActive('strike') ? 'solid' : 'outline'"
          @click="editor.chain().focus().toggleStrike().run()"
        >
          <Icon name="material-symbols:format-strikethrough" />
        </UButton>
      </UTooltip>

      <UTooltip text="Clear">
        <UButton
          color="primary"
          :variant="editor.isActive('clear') ? 'solid' : 'outline'"
          @click="editor.chain().focus().unsetAllMarks().run()"
        >
          <Icon name="material-symbols:format-clear" />
        </UButton>
      </UTooltip>

      <div class="flex items-center justify-center">
        <Icon name="clarity:ellipsis-vertical-line" />
      </div>

      <UTooltip text="Align Left">
        <UButton
          color="primary"
          :variant="
            editor.isActive({ textAlign: 'left' }) ? 'solid' : 'outline'
          "
          @click="editor.chain().focus().setTextAlign('left').run()"
        >
          <Icon name="material-symbols:format-align-left" />
        </UButton>
      </UTooltip>

      <UTooltip text="Align Center">
        <UButton
          color="primary"
          :variant="
            editor.isActive({ textAlign: 'center' }) ? 'solid' : 'outline'
          "
          @click="editor.chain().focus().setTextAlign('center').run()"
        >
          <Icon name="material-symbols:format-align-center" />
        </UButton>
      </UTooltip>

      <UTooltip text="Align Right">
        <UButton
          color="primary"
          :variant="
            editor.isActive({ textAlign: 'right' }) ? 'solid' : 'outline'
          "
          @click="editor.chain().focus().setTextAlign('right').run()"
        >
          <Icon name="material-symbols:format-align-right" />
        </UButton>
      </UTooltip>

      <UTooltip text="Align Justify">
        <UButton
          color="primary"
          :variant="
            editor.isActive({ textAlign: 'justify' }) ? 'solid' : 'outline'
          "
          @click="editor.chain().focus().setTextAlign('justify').run()"
        >
          <Icon name="material-symbols:format-align-justify" />
        </UButton>
      </UTooltip>

      <div class="flex items-center justify-center">
        <Icon name="clarity:ellipsis-vertical-line" />
      </div>

      <UTooltip text="Add Column Before">
        <UButton
          color="primary"
          variant="outline"
          :disabled="!editor.can().chain().focus().addColumnBefore().run()"
          @click="editor.chain().focus().addColumnBefore().run()"
        >
          <Icon name="mdi:table-column-plus-before" />
        </UButton>
      </UTooltip>

      <UTooltip text="Add Column After">
        <UButton
          color="primary"
          variant="outline"
          :disabled="!editor.can().chain().focus().addColumnAfter().run()"
          @click="editor.chain().focus().addColumnAfter().run()"
        >
          <Icon name="mdi:table-column-plus-after" />
        </UButton>
      </UTooltip>

      <UTooltip text="Delete Column">
        <UButton
          color="primary"
          variant="outline"
          :disabled="!editor.can().chain().focus().deleteColumn().run()"
          @click="editor.chain().focus().deleteColumn().run()"
        >
          <Icon name="mdi:table-column-remove" />
        </UButton>
      </UTooltip>

      <UTooltip text="Add Row Before">
        <UButton
          color="primary"
          variant="outline"
          :disabled="!editor.can().chain().focus().addRowBefore().run()"
          @click="editor.chain().focus().addRowBefore().run()"
        >
          <Icon name="mdi:table-row-plus-before" />
        </UButton>
      </UTooltip>

      <UTooltip text="Add Row After">
        <UButton
          color="primary"
          variant="outline"
          :disabled="!editor.can().chain().focus().addRowAfter().run()"
          @click="editor.chain().focus().addRowAfter().run()"
        >
          <Icon name="mdi:table-row-plus-after" />
        </UButton>
      </UTooltip>

      <UTooltip text="Delete Row">
        <UButton
          color="primary"
          variant="outline"
          :disabled="!editor.can().chain().focus().deleteRow().run()"
          @click="editor.chain().focus().deleteRow().run()"
        >
          <Icon name="mdi:table-row-remove" />
        </UButton>
      </UTooltip>

      <UTooltip text="Delete Table">
        <UButton
          color="primary"
          variant="outline"
          :disabled="!editor.can().chain().focus().deleteTable().run()"
          @click="editor.chain().focus().deleteTable().run()"
        >
          <Icon name="mdi:table-remove" />
        </UButton>
      </UTooltip>

      <UTooltip text="Merge Cells">
        <UButton
          color="primary"
          variant="outline"
          :disabled="!editor.can().chain().focus().mergeCells().run()"
          @click="editor.chain().focus().mergeCells().run()"
        >
          <Icon name="mdi:table-merge-cells" />
        </UButton>
      </UTooltip>

      <UTooltip text="Split Cell">
        <UButton
          color="primary"
          variant="outline"
          :disabled="!editor.can().chain().focus().splitCell().run()"
          @click="editor.chain().focus().splitCell().run()"
        >
          <Icon name="mdi:table-split-cell" />
        </UButton>
      </UTooltip>

      <UTooltip text="Toggle Header Column">
        <UButton
          color="primary"
          variant="outline"
          :disabled="!editor.can().chain().focus().toggleHeaderColumn().run()"
          @click="editor.chain().focus().toggleHeaderColumn().run()"
        >
          <Icon name="jam:table-left-header" />
        </UButton>
      </UTooltip>

      <UTooltip text="Toggle Header Row">
        <UButton
          color="primary"
          variant="outline"
          :disabled="!editor.can().chain().focus().toggleHeaderRow().run()"
          @click="editor.chain().focus().toggleHeaderRow().run()"
        >
          <Icon name="jam:table-top-header" />
        </UButton>
      </UTooltip>

      <UTooltip text="Toggle Header Cell">
        <UButton
          color="primary"
          variant="outline"
          :disabled="!editor.can().chain().focus().toggleHeaderCell().run()"
          @click="editor.chain().focus().toggleHeaderCell().run()"
        >
          <Icon
            name="streamline:computer-keyboard-wireless-remote-device-computer-wireless-electronics-qwerty-keyboard-bluetooth"
          />
        </UButton>
      </UTooltip>
    </div>
    <editor-content :editor="editor" />
  </div>
</template>

<style lang="scss">
.tiptap {
  hr.separator {
    width: 1px;
    height: inherit;
    align-self: stretch;
  }
  table {
    border-collapse: collapse;
    table-layout: fixed;
    width: 100%;
    margin: 0;
    overflow: hidden;

    td,
    th {
      min-width: 1em;
      border: 2px solid #ced4da;
      padding: 3px 5px;
      vertical-align: top;
      box-sizing: border-box;
      position: relative;

      > * {
        margin-bottom: 0;
      }
    }

    th {
      font-weight: bold;
      text-align: left;
      background-color: #f1f3f5;
    }

    .selectedCell:after {
      z-index: 2;
      position: absolute;
      content: "";
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background: rgba(200, 200, 255, 0.4);
      pointer-events: none;
    }

    .column-resize-handle {
      position: absolute;
      right: -2px;
      top: 0;
      bottom: -2px;
      width: 4px;
      background-color: #adf;
      pointer-events: none;
    }

    p {
      margin: 0;
    }
  }
}

.tableWrapper {
  padding: 1rem 0;
  overflow-x: auto;
}

.resize-cursor {
  cursor: ew-resize;
  cursor: col-resize;
}
</style>
