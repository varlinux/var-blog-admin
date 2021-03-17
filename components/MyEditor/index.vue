<template>
  <editor
    ref="md"
    initialValue="写些什么呢..."
    :options="editorOption"
    height="500px"
    initialEditType="markdown"
    previewStyle="vertical"
    :plugins="plugins"
  />
</template>

<script>
import { Editor } from "@toast-ui/vue-editor";
import colorSyntaxPlugin from "@toast-ui/editor-plugin-color-syntax";
import codeSyntaxHighlightPlugin from "@toast-ui/editor-plugin-code-syntax-highlight";
import hljs from "highlight.js";
// TODO 暂停替换maven-editor
export default {
  name: "MyEditor",
  data() {
    return {
      editorOption: {
        minHeight: "200px",
        language: "en-US",
        useCommandShortcut: true,
        useDefaultHTMLSanitizer: true,
        usageStatistics: true,
        hideModeSwitch: false,
        toolbarItems: [
          "heading",
          "bold",
          "italic",
          "strike",
          "divider",
          "hr",
          "quote",
          "divider",
          "ul",
          "ol",
          "task",
          "indent",
          "outdent",
          "divider",
          "table",
          "image",
          "link",
          "divider",
          "code",
          "codeblock"
        ],
        usageStatistics: false,
        hook: {
          addImageBlobHook: (blob, callback, source) => {
            console.log("TESTING TESTING", blob, callback, source);
            // const uploadedImageURL = this.uploadImage(blob)
            // callback(uploadedImageURL, 'alt text')
            // return false
          }
        }
      },
      plugins: [colorSyntaxPlugin, codeSyntaxHighlightPlugin.bind(hljs)]
    };
  },
  components: {
    Editor
  },
  method: {
    // 绑定@imgAdd event
    uploadImage() {
      console.log("console log from uploadImage function");
      return "testurl";
    },
    handleImage(pos, $file) {
      // 第一步.将图片上传到服务器.
      const formdata = new FormData();
      console.log(`$file : `, $file);
      formdata.append("image", $file);
      this.$store.dispatch("img/addImageToServer", formdata).then(res => {
        // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
        /**
         * $vm 指为mavonEditor实例，可以通过如下两种方式获取
         * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
         * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
         */
        if (res._code === 200) {
          // this.$vm.$img2Url(pos, data.url);
          this.$refs.md.$img2Url(pos, res._data.url);
        }
      });
    }
  }
};
</script>
<style></style>
