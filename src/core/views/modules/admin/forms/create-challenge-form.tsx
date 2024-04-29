"use client";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { formSchema } from "./create-challenge-schema";
import { Form } from "@/core/views/components/ui/form";
import { InputForm } from "@/core/views/components/ui/input-form";
import { ButtonSubmit } from "@/core/views/components/ui/button-submit";
import { createChallengeAction } from "@/core/views/actions/challenge/create-challenge";
import { TextAreaForm } from "@/core/views/components/ui/textarea-form";
import { SelectForm } from "@/core/views/components/ui/select-form";
import { FieldArrayForm } from "@/core/views/components/ui/field-array-form";
import { DIFFICULTY, LANGUAGE } from "@/config/constants";
import { SwitchForm } from "@/core/views/components/ui/switch-form";
import type * as z from "zod";

type FormValues = z.infer<typeof formSchema>;

// TODO: Refactor this component to use it for editing and authoring

export const CreateChallengeForm = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),

    defaultValues: {
      name: "test",
      description: "test",
      language: "HTML_CSS",
      difficulty: "NEWBIE",
      brief: "test",
      tips: "test",
      assets_presentation: [{ value: "https://test.com" }],
      premium: false,
      starter_code_path_file: "/starter-code/LOLACCOUNT.txt",
      starter_figma_path_file: "/starter-code/LOLACCOUNT.txt",
    },
  });

  const { fields, remove, append } = useFieldArray({
    control: form.control,
    name: "assets_presentation",
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      try {
        await createChallengeAction(values);
      } catch (error) {
        console.error(error);
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-96 p-12">
        {/* Name */}
        <InputForm control={form.control} name="name" label="Project name" />
        {/* Description */}
        <TextAreaForm
          control={form.control}
          name="description"
          label="Description"
        />
        {/* Language */}
        <SelectForm
          control={form.control}
          name="language"
          label="Language"
          items={LANGUAGE}
          placeholder="Select a language"
        />
        {/* Difficulty */}
        <SelectForm
          control={form.control}
          name="difficulty"
          label="Difficulty"
          items={DIFFICULTY}
          placeholder="Select a difficulty"
        />
        {/* Brief */}
        <TextAreaForm control={form.control} name="brief" label="Brief" />
        {/* Tips */}
        <TextAreaForm control={form.control} name="tips" label="Tips" />
        {/* Assets presentation */}
        <FieldArrayForm<FormValues>
          control={form.control}
          fields={fields}
          remove={remove}
          append={append}
          createNewItem={() => ({ value: "" })}
          name="assets_presentation"
          label={"Assets presentation"}
        />
        {/* Premium */}
        <SwitchForm control={form.control} name="premium" label="Premium" />
        {/* Starter code PATH FILE */}
        <InputForm
          control={form.control}
          name="starter_code_path_file"
          label="Starter code PATH FILE"
        />
        {/* Starter figma PATH FILE */}
        <InputForm
          control={form.control}
          name="starter_figma_path_file"
          label="Starter figma PATH FILE"
        />

        <ButtonSubmit isPending={isPending}>Create Challenge</ButtonSubmit>
      </form>
    </Form>
  );
};
