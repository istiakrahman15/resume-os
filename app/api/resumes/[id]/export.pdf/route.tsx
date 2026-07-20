import { NextResponse } from "next/server";
import React from "react";
import { renderToStream, Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { getResumeDetails } from "@/src/features/resumes/actions";

// Define PDF styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: "Helvetica",
    color: "#27272a",
    lineHeight: 1.5,
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: "#e4e4e7",
    paddingBottom: 15,
    marginBottom: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#09090b",
  },
  headline: {
    fontSize: 11,
    color: "#71717a",
    marginTop: 3,
  },
  contact: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
    color: "#71717a",
  },
  contactItem: {
    marginRight: 15,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: "bold",
    textTransform: "uppercase",
    borderBottomWidth: 1,
    borderBottomColor: "#e4e4e7",
    paddingBottom: 3,
    marginBottom: 8,
    color: "#09090b",
  },
  experienceItem: {
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  bold: {
    fontWeight: "bold",
  },
  italic: {
    fontStyle: "italic",
  },
  bulletList: {
    marginTop: 5,
    paddingLeft: 15,
  },
  bulletItem: {
    flexDirection: "row",
    marginBottom: 2,
  },
  bulletPoint: {
    width: 10,
  },
});

interface PdfDocumentProps {
  data: any;
}

const ResumePdfDocument = ({ data }: PdfDocumentProps) => {
  const { header, summary, workExperience, education, skills } = data;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Contact Header */}
        {header && (
          <View style={styles.header}>
            <Text style={styles.name}>{header.name || "Your Name"}</Text>
            <Text style={styles.headline}>{header.headline || "Professional Headline"}</Text>
            <View style={styles.contact}>
              {header.email && <Text style={styles.contactItem}>{header.email}</Text>}
              {header.phone && <Text style={styles.contactItem}>{header.phone}</Text>}
              {header.location && <Text style={styles.contactItem}>{header.location}</Text>}
              {header.website && <Text style={styles.contactItem}>{header.website}</Text>}
            </View>
          </View>
        )}

        {/* Profile Summary */}
        {summary?.body && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Profile Summary</Text>
            <Text>{summary.body}</Text>
          </View>
        )}

        {/* Work Experience */}
        {workExperience && workExperience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Work Experience</Text>
            {workExperience.map((exp: any, idx: number) => (
              <View key={idx} style={styles.experienceItem}>
                <View style={styles.row}>
                  <Text style={styles.bold}>{exp.company}</Text>
                  <Text>{exp.startDate} — {exp.endDate || "Present"}</Text>
                </View>
                <Text style={styles.italic}>{exp.title}</Text>
                {exp.bullets && exp.bullets.length > 0 && (
                  <View style={styles.bulletList}>
                    {exp.bullets.map((b: string, bIdx: number) => (
                      <View key={bIdx} style={styles.bulletItem}>
                        <Text style={styles.bulletPoint}>•</Text>
                        <Text style={{ flex: 1 }}>{b}</Text>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {education.map((edu: any, idx: number) => (
              <View key={idx} style={styles.experienceItem}>
                <View style={styles.row}>
                  <Text style={styles.bold}>{edu.school}</Text>
                  <Text>{edu.startDate} — {edu.endDate || "Present"}</Text>
                </View>
                <Text style={styles.italic}>
                  {edu.degree} in {edu.fieldOfStudy} {edu.gpa && `(GPA: ${edu.gpa})`}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        {skills && skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            {skills.map((grp: any, idx: number) => (
              <Text key={idx} style={{ marginBottom: 4 }}>
                <Text style={styles.bold}>{grp.category}: </Text>
                <Text>{grp.skills?.map((s: any) => s.name).join(", ")}</Text>
              </Text>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
};

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const resume = await getResumeDetails(id);
    const dataJson = resume.dataJson || {};

    const pdfStream = await renderToStream(
      <ResumePdfDocument data={dataJson} />
    );

    return new Response(pdfStream as any, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${resume.title.replace(/\s+/g, "_")}.pdf"`,
      },
    });
  } catch (error: any) {
    console.error("PDF generation failed:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate PDF." },
      { status: 500 }
    );
  }
}
