import { defineComponent, onMounted, onUnmounted, ref, Transition } from 'vue'
import { toggleDarkMode, chatBarState, isDark } from '@/composables'
import Logo from '@/components/Logo'
import Button from '@/components/Button'
import Input from '@/components/Input'
import PerfectScrollbar from '@/components/perfect-scrollbar'
import {
  AdjustmentsIcon,
  ChatIcon,
  DesktopComputerIcon,
  ExternalLinkIcon,
  MicrophoneIcon,
  PaperClipIcon,
  VideoCameraIcon,
  XIcon,
  MoonIcon,
  SunIcon,
} from '@heroicons/vue/outline'

export default defineComponent({
  setup() {
    const isCamActive = ref(false)

    const isMicActive = ref(false)

    onMounted(() => {
      window.addEventListener('resize', chatBarState.handleWindowResize)
    })

    onUnmounted(() => {
      window.removeEventListener('resize', chatBarState.handleWindowResize)
    })

    return () => (
      <>
        <main class="h-screen bg-white text-gray-900 md:p-6 lg:flex lg:gap-4 dark:bg-dark-eval-0 dark:text-gray-200">
          <h1 class="sr-only">Video conference</h1>
          <div class="rounded-lg flex flex-col h-full md:gap-4 lg:grow">
            {/* Header */}
            <header class="hidden flex-col md:flex-row md:flex items-center gap-6">
              <a href="#" class="flex-shrink-0">
                <Logo aria-hidden="true" class="w-14 h-14" />
                <span class="sr-only">K UI</span>
              </a>

              <div class="grow flex items-center justify-between gap-4 w-full bg-gray-100 p-4 rounded-2xl dark:bg-dark-eval-1">
                <div class="space-y-1">
                  <h2 class="text-2xl font-medium">Conference Meeting</h2>
                  <p class="text-sm text-gray-600 font-medium dark:text-gray-400">Sub title</p>
                </div>

                <div class="flex-col md:flex-row flex items-center gap-3">
                  <Button onClick={toggleDarkMode} variant="secondary" pill iconOnly srText="Toggle dark mode">
                    {({ iconSizeClasses }) => (
                      <>
                        <MoonIcon v-show={!isDark.value} aria-hidden="true" class={iconSizeClasses} />
                        <SunIcon v-show={isDark.value} aria-hidden="true" class={iconSizeClasses} />
                      </>
                    )}
                  </Button>
                  <Button variant="secondary" pill iconOnly srText="Adjustment">
                    {({ iconSizeClasses }) => <AdjustmentsIcon aria-hidden="true" class={iconSizeClasses} />}
                  </Button>
                  <Button variant="secondary" pill iconOnly srText="Share link">
                    {({ iconSizeClasses }) => <ExternalLinkIcon aria-hidden="true" class={iconSizeClasses} />}
                  </Button>
                </div>
              </div>
            </header>

            {/* Video */}
            <section class="grow grid grid-cols-1 grid-rows-1 overflow-hidden border-gray-400 md:border-2 md:rounded-2xl dark:border-gray-700">
              <h2 class="sr-only">Video Section</h2>
              <div class="col-[1/1] row-[1/1]">{/* Main Video */}</div>
              <div class="col-[1/1] row-[1/1]">
                <div class="grid grid-cols-3 md:grid-cols-1 gap-2 p-2">
                  <div class="h-28 md:w-36  rounded-lg border-gray-400 border-2 dark:border-gray-700">
                    {/* Other video */}
                  </div>
                  <div class="h-28 md:w-36  rounded-lg border-gray-400 border-2 dark:border-gray-700">
                    {/* Other video */}
                  </div>
                  <div class="h-28 md:w-36  rounded-lg border-gray-400 border-2 dark:border-gray-700">
                    {/* Other video */}
                  </div>
                </div>
              </div>
            </section>

            {/* Controlles */}
            <section class="flex-shrink-0 flex items-center gap-4 justify-center bg-gray-100 p-4 md:gap-8 md:rounded-2xl dark:bg-dark-eval-1">
              <h2 class="sr-only">Video Controllers</h2>
              <div class="flex flex-col gap-2 items-center">
                <Button variant={isCamActive.value ? 'primary' : 'secondary'} size="lg" pill iconOnly srText="Camera">
                  {({ iconSizeClasses }) => <VideoCameraIcon aria-hidden="true" class={iconSizeClasses} />}
                </Button>

                <span class="text-gray-600 dark:text-gray-400">Cam</span>
              </div>

              <div class="flex flex-col gap-2 items-center">
                <Button
                  variant={isMicActive.value ? 'primary' : 'secondary'}
                  size="lg"
                  pill
                  iconOnly
                  srText="Microphone"
                >
                  {({ iconSizeClasses }) => <MicrophoneIcon aria-hidden="true" class={iconSizeClasses} />}
                </Button>
                <span class="text-gray-600 dark:text-gray-400">Mic</span>
              </div>

              <div class="flex flex-col gap-2 items-center">
                <Button variant="secondary" size="lg" pill iconOnly srText="Share Screen">
                  {({ iconSizeClasses }) => <DesktopComputerIcon aria-hidden="true" class={iconSizeClasses} />}
                </Button>
                <span class="text-gray-600 dark:text-gray-400">Screen</span>
              </div>

              <div class="flex flex-col gap-2 items-center">
                <Button
                  onClick={() => {
                    chatBarState.isOpen = !chatBarState.isOpen
                  }}
                  variant={chatBarState.isOpen ? 'primary' : 'secondary'}
                  size="lg"
                  pill
                  iconOnly
                  srText="Chat"
                >
                  {({ iconSizeClasses }) => <ChatIcon aria-hidden="true" class={iconSizeClasses} />}
                </Button>
                <span class="text-gray-600 dark:text-gray-400">Chat</span>
              </div>

              <div class="flex flex-col gap-2 items-center">
                <Button variant="danger" size="lg" pill iconOnly srText="Leave">
                  {({ iconSizeClasses }) => <XIcon aria-hidden="true" class={iconSizeClasses} />}
                </Button>
                <span class="text-gray-600 dark:text-gray-400">Leave</span>
              </div>
            </section>
          </div>

          {/* Chat Section */}
          <Transition
            enterActiveClass="transform transition ease-in-out duration-500 sm:duration-700"
            enterFromClass="translate-x-full"
            enterToClass="translate-x-0"
            leaveActiveClass="transform transition ease-in-out duration-500 sm:duration-700"
            leaveFromClass="translate-x-0"
            leaveToClass="translate-x-full"
          >
            <section
              v-show={chatBarState.isOpen}
              class="fixed inset-y-0 right-0 max-w-sm w-full max-h-screen flex flex-col gap-4 bg-gray-100 lg:rounded-2xl lg:static p-4 dark:bg-dark-eval-1"
            >
              <h2 class="sr-only">Chat Panel</h2>
              {/* Header */}
              <div class="flex items-center justify-between">
                <h2 class="text-xl font-medium">Chat</h2>
                <Button
                  onClick={() => {
                    chatBarState.isOpen = false
                  }}
                  variant="secondary"
                  pill
                  iconOnly
                  srText="Hide chat"
                >
                  {({ iconSizeClasses }) => <XIcon aria-hidden="true" class={iconSizeClasses} />}
                </Button>
              </div>

              {/* Chat content */}
              <PerfectScrollbar class="flex-1 grid gap-6 overflow-auto">
                {Array(20)
                  .fill(1)
                  .map((n, i) => (
                    <div class="flex items-start gap-2">
                      {/* Avatar */}
                      <div class="w-14 h-14 rounded-full bg-white flex-shrink-0 relative dark:bg-dark-eval-2">
                        <div class="absolute bottom-1 -right-1 w-4 h-4 border-2 border-white rounded-full bg-green-500 dark:border-dark-eval-1"></div>
                      </div>

                      {/* Message */}
                      <div class="grow bg-white shadow-md rounded-xl p-2 space-y-1 dark:bg-dark-eval-2">
                        <div class="flex items-center justify-between">
                          <h3 class="text-lg font-medium">Name</h3>
                          <span class="text-xs font-normal text-gray-400">1 minte ago</span>
                        </div>
                        <p class="text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                      </div>
                    </div>
                  ))}
              </PerfectScrollbar>

              {/* Input */}
              <div class="flex-shrink-0 p-2">
                <div class="bg-white shadow-md rounded-lg p-2 flex items-center gap-2 dark:bg-dark-eval-2">
                  <button class="p-1 text-gray-500 dark:text-gray-300">
                    <PaperClipIcon aria-hidden="true" class="w-4 h-4" />
                  </button>

                  <Input type="text" class="w-full" placeholder="Enter Message" />

                  <Button pill iconOnly srText="Send">
                    {({ iconSizeClasses }) => (
                      <svg
                        aria-hidden="true"
                        class={iconSizeClasses}
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="m21.426 11.095-17-8A.999.999 0 0 0 3.03 4.242L4.969 12 3.03 19.758a.998.998 0 0 0 1.396 1.147l17-8a1 1 0 0 0 0-1.81zM5.481 18.197l.839-3.357L12 12 6.32 9.16l-.839-3.357L18.651 12l-13.17 6.197z"></path>
                      </svg>
                    )}
                  </Button>
                </div>
              </div>
            </section>
          </Transition>
        </main>

        {/* Github link */}
        <div class="fixed bottom-2 left-2 md:bottom-5 md:left-5 p-2">
          <Button
            target="_blank"
            href="https://github.com/kamona-ui/video-conference-layout"
            variant="black"
            pill
            iconOnly
            srText="Toggle dark mode"
          >
            {({ iconSizeClasses }) => (
              <svg
                aria-hidden="true"
                class={iconSizeClasses}
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12.026 2C6.517 2 2.052 6.465 2.052 11.974C2.052 16.38 4.909 20.119 8.873 21.439C9.372 21.529 9.552 21.222 9.552 20.958C9.552 20.721 9.544 20.093 9.541 19.262C6.766 19.864 6.18 17.924 6.18 17.924C5.728 16.772 5.073 16.465 5.073 16.465C4.168 15.846 5.142 15.86 5.142 15.86C6.144 15.93 6.669 16.888 6.669 16.888C7.559 18.412 9.005 17.972 9.571 17.717C9.662 17.072 9.922 16.632 10.206 16.383C7.992 16.132 5.664 15.276 5.664 11.453C5.664 10.366 6.053 9.474 6.688 8.778C6.587 8.525 6.242 7.51 6.787 6.138C6.787 6.138 7.624 5.869 9.529 7.159C10.3426 6.93767 11.1818 6.8247 12.025 6.823C12.8682 6.82437 13.7075 6.93735 14.521 7.159C16.427 5.868 17.263 6.138 17.263 6.138C17.808 7.51 17.466 8.525 17.362 8.778C18.002 9.474 18.386 10.365 18.386 11.453C18.386 15.286 16.056 16.128 13.834 16.375C14.189 16.683 14.509 17.291 14.509 18.221C14.509 19.555 14.497 20.631 14.497 20.958C14.497 21.225 14.675 21.535 15.184 21.437C19.146 20.115 22 16.379 22 11.974C22 6.465 17.535 2 12.026 2Z"
                />
              </svg>
            )}
          </Button>
        </div>
      </>
    )
  },
})
