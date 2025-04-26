<template>
    <div class="min-h-screen">
        <section class="bg-white shadow-md rounded-2xl p-8 mb-10">
          <h2 class="text-xl font-semibold text-blue-400 mb-5 flex items-center">
            Installation and Usage Steps
          </h2>
          <ul class="list-disc list-inside text-gray-700 space-y-3">
            <li>Click the download button for the Ruby file</li>
            <li>Place the downloaded file in your extension ruby directory</li>
            <li>If you encrypt the extension, make sure to add the file 'AIExtensionsCenter.rbz' after the encryption.</li>
          </ul>
        </section>
  
        <section class="bg-white shadow-md rounded-2xl p-8 mb-10">
          <h2 class="text-xl font-semibold text-blue-400 mb-5 flex items-center">
            How to Configure
          </h2>
          <p class="text-gray-700 mb-4">
            1. Use <code class="bg-gray-100 text-blue-500 px-2 py-1 rounded">Sketchup.require File.join(File.dirname(__FILE__), 'ConfigAI')</code> inside your module file.
          </p>
  
          <div class="bg-gray-50 text-gray-800 border border-gray-200 rounded-lg p-6 text-sm font-mono overflow-x-auto mb-6">
  <pre><code>Sketchup.require File.join(File.dirname(__FILE__), 'ConfigAI')</code></pre>
          </div>
  
          <p class="text-gray-700 mb-4">
            2. License Validation:
          </p>
  
          <div class="bg-gray-50 text-gray-800 border border-gray-200 rounded-lg p-6 text-sm font-mono overflow-x-auto">
  <pre><code>if <span class="text-sky-500">{{ moduleName }}::AIExtensionsCenter.check_license</span>
  show_dialog
else
  <span class="text-sky-500">{{ moduleName }}::AIExtensionsCenter.show_license_form</span>
end</code></pre>
          </div>
        </section>
  
        <section class="bg-white shadow-md rounded-2xl p-8 mb-10">
          <h2 class="text-xl font-semibold text-blue-400 mb-5 flex items-center">
            Example
          </h2>
  
          <div class="bg-gray-50 text-gray-800 border border-gray-200 rounded-lg p-6 text-sm font-mono overflow-x-auto">
  <pre><code>require 'sketchup.rb'
require 'extensions.rb'

module <span class="text-sky-500">{{ moduleName }}</span>
 module AiExtensionsCenter
    <span class="text-sky-500">Sketchup.require File.join(File.dirname(__FILE__), 'ConfigAI')</span>

     unless file_loaded?(__FILE__)
      UI.menu('Extensions').add_item("Hello") { 
        if <span class="text-sky-500">{{ moduleName }}::AIExtensionsCenter.check_license</span>
            UI.messagebox("Hello World!")
        else
            <span class="text-sky-500">{{ moduleName }}::AIExtensionsCenter.show_license_form</span>
        end
      }
     end

    file_loaded(__FILE__)
 end
end
</code></pre>
        </div>
    </section>
</div>
</template>

<script setup>
defineProps({
  moduleName: {
    type: String,
    required: true
  }
})
</script>