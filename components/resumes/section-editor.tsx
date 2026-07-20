"use client";

import { useForm } from "react-hook-form";
import { useResumeEditorStore } from "@/src/features/resumes/stores/resume-editor-store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { updateResume } from "@/src/features/resumes/actions";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { Save, Plus, Trash } from "lucide-react";

export function SectionEditor() {
  const { resumeId, activeSection, data, updateHeader, updateSummary, updateWorkExperience, updateEducation, updateSkills, updateProjects, updateCertifications, updateLanguages } = useResumeEditorStore();
  const [loading, setLoading] = useState(false);

  // Local helper list state for experience/projects
  const [localExperience, setLocalExperience] = useState<any[]>([]);
  const [localEducation, setLocalEducation] = useState<any[]>([]);
  const [localSkills, setLocalSkills] = useState<any[]>([]);
  const [localProjects, setLocalProjects] = useState<any[]>([]);
  const [localCerts, setLocalCerts] = useState<any[]>([]);
  const [localLangs, setLocalLangs] = useState<any[]>([]);

  useEffect(() => {
    setLocalExperience(data.workExperience || []);
    setLocalEducation(data.education || []);
    setLocalSkills(data.skills || []);
    setLocalProjects(data.projects || []);
    setLocalCerts(data.certifications || []);
    setLocalLangs(data.languages || []);
  }, [data]);

  const handleSave = async () => {
    if (!resumeId) return;
    setLoading(true);
    try {
      await updateResume(resumeId, { dataJson: data });
      toast.success("Changes saved successfully.");
    } catch (err: any) {
      toast.error(err.message || "Failed to save changes.");
    } finally {
      setLoading(false);
    }
  };

  // Header Sub-Form Renderer
  const renderHeaderForm = () => {
    const val = data.header || { name: "", headline: "", email: "", phone: "", location: "", website: "", github: "", linkedin: "" };
    const updateVal = (key: string, value: string) => {
      updateHeader({ ...val, [key]: value });
    };

    return (
      <div className="space-y-4">
        <h3 className="text-sm font-bold border-b pb-2">Contact Header</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label className="text-xxs font-semibold">Full Name</Label>
            <Input size="sm" value={val.name} onChange={(e) => updateVal("name", e.target.value)} />
          </div>
          <div className="space-y-1">
            <Label className="text-xxs font-semibold">Headline</Label>
            <Input size="sm" value={val.headline} onChange={(e) => updateVal("headline", e.target.value)} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label className="text-xxs font-semibold">Email Address</Label>
            <Input size="sm" type="email" value={val.email} onChange={(e) => updateVal("email", e.target.value)} />
          </div>
          <div className="space-y-1">
            <Label className="text-xxs font-semibold">Phone Number</Label>
            <Input size="sm" value={val.phone} onChange={(e) => updateVal("phone", e.target.value)} />
          </div>
        </div>
        <div className="space-y-1">
          <Label className="text-xxs font-semibold">Location (City, Country)</Label>
          <Input size="sm" value={val.location} onChange={(e) => updateVal("location", e.target.value)} />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-1">
            <Label className="text-xxs font-semibold">Website</Label>
            <Input size="sm" value={val.website} onChange={(e) => updateVal("website", e.target.value)} />
          </div>
          <div className="space-y-1">
            <Label className="text-xxs font-semibold">GitHub</Label>
            <Input size="sm" value={val.github || ""} onChange={(e) => updateVal("github", e.target.value)} />
          </div>
          <div className="space-y-1">
            <Label className="text-xxs font-semibold">LinkedIn</Label>
            <Input size="sm" value={val.linkedin || ""} onChange={(e) => updateVal("linkedin", e.target.value)} />
          </div>
        </div>
      </div>
    );
  };

  // Summary Sub-Form Renderer
  const renderSummaryForm = () => {
    const val = data.summary || { body: "" };
    return (
      <div className="space-y-4">
        <h3 className="text-sm font-bold border-b pb-2">Professional Summary</h3>
        <div className="space-y-1">
          <Label className="text-xxs font-semibold">Summary Profile Body</Label>
          <Textarea
            rows={6}
            placeholder="Brief professional profile summary..."
            value={val.body}
            onChange={(e) => updateSummary({ body: e.target.value })}
            className="text-xs"
          />
        </div>
      </div>
    );
  };

  // Work Experience Sub-Form Renderer
  const renderWorkExperienceForm = () => {
    const addExperience = () => {
      const newItem = { company: "", title: "", startDate: "", endDate: "", current: false, bullets: [""] };
      const updated = [...localExperience, newItem];
      setLocalExperience(updated);
      updateWorkExperience(updated);
    };

    const updateItem = (index: number, key: string, val: any) => {
      const updated = [...localExperience];
      updated[index] = { ...updated[index], [key]: val };
      setLocalExperience(updated);
      updateWorkExperience(updated);
    };

    const removeItem = (index: number) => {
      const updated = localExperience.filter((_, i) => i !== index);
      setLocalExperience(updated);
      updateWorkExperience(updated);
    };

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center border-b pb-2">
          <h3 className="text-sm font-bold">Work Experience</h3>
          <Button size="xs" variant="outline" className="rounded-full text-xxs" onClick={addExperience}>
            <Plus className="h-3 w-3 mr-1" /> Add Job
          </Button>
        </div>

        {localExperience.length === 0 ? (
          <p className="text-xs text-muted-foreground text-center py-4">No experience added yet.</p>
        ) : (
          <div className="space-y-6">
            {localExperience.map((exp, index) => (
              <div key={index} className="border border-border p-4 rounded-xl space-y-4 bg-muted/10 relative">
                <Button
                  size="icon-xs"
                  variant="destructive"
                  className="absolute top-3 right-3"
                  onClick={() => removeItem(index)}
                >
                  <Trash className="h-3.5 w-3.5" />
                </Button>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="space-y-1">
                    <Label className="text-xxs font-semibold">Company</Label>
                    <Input size="sm" value={exp.company} onChange={(e) => updateItem(index, "company", e.target.value)} />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xxs font-semibold">Job Title</Label>
                    <Input size="sm" value={exp.title} onChange={(e) => updateItem(index, "title", e.target.value)} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label className="text-xxs font-semibold">Start Date</Label>
                    <Input size="sm" placeholder="MM/YYYY" value={exp.startDate} onChange={(e) => updateItem(index, "startDate", e.target.value)} />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xxs font-semibold">End Date</Label>
                    <Input size="sm" placeholder="MM/YYYY or Present" value={exp.endDate} onChange={(e) => updateItem(index, "endDate", e.target.value)} />
                  </div>
                </div>
                <div className="space-y-1">
                  <Label className="text-xxs font-semibold">Job Description Bullets</Label>
                  <Textarea
                    rows={3}
                    placeholder="Enter accomplishments, one per line..."
                    value={exp.bullets?.join("\n") || ""}
                    onChange={(e) => updateItem(index, "bullets", e.target.value.split("\n"))}
                    className="text-xs font-sans"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // Education Sub-Form Renderer
  const renderEducationForm = () => {
    const addEdu = () => {
      const newItem = { school: "", degree: "", fieldOfStudy: "", startDate: "", endDate: "", gpa: "" };
      const updated = [...localEducation, newItem];
      setLocalEducation(updated);
      updateEducation(updated);
    };

    const updateItem = (index: number, key: string, val: any) => {
      const updated = [...localEducation];
      updated[index] = { ...updated[index], [key]: val };
      setLocalEducation(updated);
      updateEducation(updated);
    };

    const removeItem = (index: number) => {
      const updated = localEducation.filter((_, i) => i !== index);
      setLocalEducation(updated);
      updateEducation(updated);
    };

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center border-b pb-2">
          <h3 className="text-sm font-bold">Education</h3>
          <Button size="xs" variant="outline" className="rounded-full text-xxs" onClick={addEdu}>
            <Plus className="h-3 w-3 mr-1" /> Add School
          </Button>
        </div>

        {localEducation.length === 0 ? (
          <p className="text-xs text-muted-foreground text-center py-4">No education added yet.</p>
        ) : (
          <div className="space-y-6">
            {localEducation.map((edu, index) => (
              <div key={index} className="border border-border p-4 rounded-xl space-y-4 bg-muted/10 relative">
                <Button
                  size="icon-xs"
                  variant="destructive"
                  className="absolute top-3 right-3"
                  onClick={() => removeItem(index)}
                >
                  <Trash className="h-3.5 w-3.5" />
                </Button>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="space-y-1">
                    <Label className="text-xxs font-semibold">School Name</Label>
                    <Input size="sm" value={edu.school} onChange={(e) => updateItem(index, "school", e.target.value)} />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xxs font-semibold">Degree</Label>
                    <Input size="sm" value={edu.degree} onChange={(e) => updateItem(index, "degree", e.target.value)} />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <Label className="text-xxs font-semibold">Field of Study</Label>
                    <Input size="sm" value={edu.fieldOfStudy} onChange={(e) => updateItem(index, "fieldOfStudy", e.target.value)} />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xxs font-semibold">Start Date</Label>
                    <Input size="sm" placeholder="MM/YYYY" value={edu.startDate} onChange={(e) => updateItem(index, "startDate", e.target.value)} />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xxs font-semibold">End Date</Label>
                    <Input size="sm" placeholder="MM/YYYY" value={edu.endDate} onChange={(e) => updateItem(index, "endDate", e.target.value)} />
                  </div>
                </div>
                <div className="space-y-1">
                  <Label className="text-xxs font-semibold">GPA / Honors</Label>
                  <Input size="sm" value={edu.gpa || ""} onChange={(e) => updateItem(index, "gpa", e.target.value)} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // Skills Sub-Form Renderer
  const renderSkillsForm = () => {
    const addSkillGroup = () => {
      const newItem = { category: "", skills: [{ name: "", level: "intermediate" as any }] };
      const updated = [...localSkills, newItem];
      setLocalSkills(updated);
      updateSkills(updated);
    };

    const updateGroupCategory = (index: number, val: string) => {
      const updated = [...localSkills];
      updated[index] = { ...updated[index], category: val };
      setLocalSkills(updated);
      updateSkills(updated);
    };

    const updateGroupSkills = (index: number, val: string) => {
      const updated = [...localSkills];
      const skillList = val.split(",").map((s) => ({ name: s.trim(), level: "intermediate" as any }));
      updated[index] = { ...updated[index], skills: skillList };
      setLocalSkills(updated);
      updateSkills(updated);
    };

    const removeGroup = (index: number) => {
      const updated = localSkills.filter((_, i) => i !== index);
      setLocalSkills(updated);
      updateSkills(updated);
    };

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center border-b pb-2">
          <h3 className="text-sm font-bold">Skills Categories</h3>
          <Button size="xs" variant="outline" className="rounded-full text-xxs" onClick={addSkillGroup}>
            <Plus className="h-3 w-3 mr-1" /> Add Category
          </Button>
        </div>

        {localSkills.length === 0 ? (
          <p className="text-xs text-muted-foreground text-center py-4">No skills categories configured.</p>
        ) : (
          <div className="space-y-6">
            {localSkills.map((grp, index) => {
              const skillString = grp.skills?.map((s: any) => s.name).join(", ") || "";
              return (
                <div key={index} className="border border-border p-4 rounded-xl space-y-4 bg-muted/10 relative">
                  <Button
                    size="icon-xs"
                    variant="destructive"
                    className="absolute top-3 right-3"
                    onClick={() => removeGroup(index)}
                  >
                    <Trash className="h-3.5 w-3.5" />
                  </Button>
                  <div className="space-y-1 pt-4">
                    <Label className="text-xxs font-semibold">Category Title (e.g. Languages)</Label>
                    <Input size="sm" value={grp.category} onChange={(e) => updateGroupCategory(index, e.target.value)} />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xxs font-semibold">Skills (comma-separated)</Label>
                    <Input size="sm" placeholder="React, Node.js, Go" value={skillString} onChange={(e) => updateGroupSkills(index, e.target.value)} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  const renderActiveForm = () => {
    switch (activeSection) {
      case "header":
        return renderHeaderForm();
      case "summary":
        return renderSummaryForm();
      case "workExperience":
        return renderWorkExperienceForm();
      case "education":
        return renderEducationForm();
      case "skills":
        return renderSkillsForm();
      default:
        return <p className="text-xs text-muted-foreground">Section editor setup is arriving shortly.</p>;
    }
  };

  return (
    <div className="flex flex-col h-full justify-between">
      <div className="overflow-y-auto px-1 py-2 flex-1">
        {renderActiveForm()}
      </div>
      <div className="border-t border-border pt-4 mt-6 flex items-center justify-end">
        <Button
          onClick={handleSave}
          disabled={loading}
          className="rounded-full bg-brand text-brand-foreground hover:bg-brand/90 font-semibold text-xs h-9 px-6 shadow-sm gap-1.5"
        >
          <Save className="h-4 w-4" />
          {loading ? "Saving..." : "Save changes"}
        </Button>
      </div>
    </div>
  );
}
