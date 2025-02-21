"use client";
import ActionButton from "@/components/atoms/buttons/ActionButton";
import FormInput from "@/components/molecules/forms/FormInput";
import FormSelect from "@/components/molecules/forms/FormSelect";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";

const SideForm = () => {

    const form = useForm();
    return (
        <div className="bg-white w-full p-4 my-7 grid rounded-lg shadow-md gap-6">
            <div className="grid gap-4">
                <h3 className="text-md font-semibold p-2 bg-muted">Categories Section</h3>
                <Form {...form}>
                    <form>
                        <h3 className="text-md font-medium pb-3">Create Category</h3>
                        <div className="flex justify-between items-end">
                            <div className="w-3/4">
                              <FormInput control={form.control} name="name" label="Product Category"/>
                            </div>
                            
                            <div className="flex justify-end pb-2">
                              <ActionButton title="Create" type="submit" loading={false} loaderText="Creating..."/>
                            </div>
                            
                        </div>
                    </form>
                </Form>
                <Form {...form}>
                    <form>
                        <h3 className="text-mdfont-medium pb-3">Create Sub Category</h3>
                        <div>
                          <FormInput control={form.control} name="name" label="Product Sub Category"/>
                        </div>
                        <div>
                          <FormSelect control={form.control} name="parent_category" label="Parent Category" items={[]}/>
                        </div>
                        <div className="flex justify-end py-2">
                          <ActionButton title="Create" type="submit" loading={false} loaderText="Creating..."/>
                        </div>
                    </form>
                </Form>
            </div>
            <div>
                <h3 className="text-md font-semibold p-2 bg-muted">Attributes Section</h3>
                <Form {...form}>
                    <form>
                        <h3 className="text-mdfont-medium pb-3">Create Attribute</h3>
                        <div>
                          <FormInput control={form.control} name="name" label="Attribute Name"/>
                        </div>
                        <div>
                          <p className="text-sm italic text-primary">Add attribute values by seperating them with a comma eg Red, Green, Blue</p>
                          <FormInput control={form.control} name="values" label="Attribute Values" placeholder="Eg. Red, Green, Blue"/>
                        </div>
                        <div className="flex justify-end py-2">
                          <ActionButton title="Create" type="submit" loading={false} loaderText="Creating..."/>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default SideForm;