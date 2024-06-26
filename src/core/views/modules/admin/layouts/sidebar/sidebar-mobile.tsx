"use client";

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useSidebar } from "@/core/views/modules/admin/stores/useSidebar";
import { SidebarLayout } from "@/core/views/modules/admin/layouts/sidebar/sidebar-layout";
import { SidebarNavigation } from "@/core/views/modules/admin/layouts/sidebar/sidebar-navigation";
import { SidebarClose } from "@/core/views/modules/admin/layouts/sidebar/sidebar-close";
import { SidebarLogo } from "@/core/views/modules/admin/layouts/sidebar/sidebar-logo";

export const SidebarMobile = () => {
  const { isOpen, close } = useSidebar();

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50 lg:hidden" onClose={close}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-900/80" />
        </Transition.Child>

        <div className="fixed inset-0 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                  <SidebarClose />
                </div>
              </Transition.Child>

              <SidebarLayout>
                <SidebarLogo />
                <SidebarNavigation />
              </SidebarLayout>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
