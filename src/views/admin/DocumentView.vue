<template>
  <div class="p-8 bg-gray-100 min-h-screen flex flex-col">
    <div class="bg-white shadow-xl rounded-lg p-6 w-full">
      <h1 class="text-4xl font-extrabold text-center text-gray-800 mb-8">📌 How to Use Ai Extensions Center</h1>

      <section class="mb-6 p-5 border-l-8 border-blue-600 bg-blue-50 rounded-lg">
        <h2 class="text-2xl font-bold text-gray-800 mb-3">🚀 Installation and Usage Steps</h2>
        <ul class="list-disc ml-6 text-gray-600">
          <li>Go to the <strong>Extension Dashboard</strong> of each <strong>Extension</strong></li>
          <li>Click the download button for the <strong>Ruby</strong> file</li>
          <li>Place the downloaded file in your <strong>extension ruby</strong> directory</li>
        </ul>
      </section>

      <section class="mb-6 p-5 border-l-8 border-green-600 bg-green-50 rounded-lg">
        <h2 class="text-2xl font-bold text-gray-800 mb-3">⚙️ How to Configure</h2>
        <h3 class="text-lg font-semibold mt-3 text-gray-700">📌 1. Use require_relative within Your Module</h3>
        <pre
          class="bg-gray-900 text-green-400 p-4 rounded-md text-sm overflow-auto mt-3">require_relative 'AiExtensionsCenter'</pre>

        <h3 class="text-lg font-semibold mt-3 text-gray-700">📌 2. Add a License Management Menu to Your Extension</h3>
        <ul class="list-disc ml-6 text-gray-600">
          <li>The <strong>Activate License</strong> menu allows users to enter their license key.</li>
          <li>The <strong>Validate License</strong> menu is used to verify the license and enable functions.</li>
        </ul>
        <pre class="bg-gray-900 text-green-400 p-4 rounded-md text-sm overflow-auto mt-3">ai_extensions_center_menu = UI.menu('Extensions').add_submenu("your_extension_name")
ai_extensions_center_menu.add_item("Activate License") { SketchupHome::AiExtensionsCenter.license }
ai_extensions_center_menu.add_item("Validate License") { SketchupHome::AiExtensionsCenter.validate_license }</pre>
      </section>

      <section class="mb-6 p-5 border-l-8 border-purple-600 bg-purple-50 rounded-lg">
        <h2 class="text-2xl font-bold text-gray-800 mb-3">📜 Example loader file</h2>
        <pre class="bg-gray-900 text-green-400 p-4 rounded-md text-sm overflow-auto">
require 'sketchup.rb'
require 'extensions.rb'

module SketchupHome
  module AiExtensionsCenter
    <span class="text-yellow-500"># Add this code</span>
    require_relative 'AiExtensionsCenter'
    
    unless file_loaded?(__FILE__)<span class="text-purple-500"></span>

      <span class="text-yellow-500"># Add this code</span>
      ai_extensions_center_menu = UI.menu('Extensions').add_submenu("your_extension_name")
      ai_extensions_center_menu.add_item("Activate License") { SketchupHome::AiExtensionsCenter.license }
      ai_extensions_center_menu.add_item("Validate License") { SketchupHome::AiExtensionsCenter.validate_license }

      <span class="text-yellow-500"># Example to implement menu</span>
      your_extension_name = ai_extensions_center_menu.add_item("your_extension_name") { UI.messagebox("Hello World!") }
        ai_extensions_center_menu.set_validation_proc(your_extension_name){
          SketchupHome::AiExtensionsCenter.instance_variable_get(:@validate_license) ? MF_ENABLED : MF_GRAYED
        }
      
      <span class="text-yellow-500"># Example to implement function</span>
      def self.show_your_dialog
        if SketchupHome::AiExtensionsCenter.instance_variable_get(:@validate_license)
        <span class="text-yellow-500"># Your function</span>
          UI::YourExtensionName.show_dialog
        else
          UI.messagebox("License Invalid")
        end
      end

    end

    file_loaded(__FILE__)
  end
end</pre>
      </section>
      <section class="mb-6 p-5 border-l-8 border-yellow-600 bg-yellow-50 rounded-lg">
        <h2 class="text-2xl font-bold text-gray-800 mb-3">💡 Usage Tips</h2>
        <p class="text-gray-700 mb-3">
          You can use the variable <code
            class="bg-gray-200 px-2 py-1 rounded">SketchupHome::AiExtensionsCenter.instance_variable_get(:@validate_license)</code>
          to enable or disable specific functions based on the license validation status.
        </p>
        <pre class="bg-gray-900 text-green-400 p-4 rounded-md text-sm overflow-auto mb-2">
ai_extensions_center_menu.set_validation_proc(your_extension_name){
<span class="text-yellow-500">  SketchupHome::AiExtensionsCenter.instance_variable_get(:@validate_license)</span> ? MF_ENABLED : MF_GRAYED
}</pre>
        <pre class="bg-gray-900 text-green-400 p-4 rounded-md text-sm overflow-auto">
def self.show_your_dialog
  if <span class="text-yellow-500">SketchupHome::AiExtensionsCenter.instance_variable_get(:@validate_license)</span>
    UI::YourExtensionName.show_dialog
  else
    UI.messagebox("License Invalid")
  end
end</pre>
      </section>
    </div>
  </div>
</template>

<script setup>
</script>