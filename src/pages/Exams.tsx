import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Clock, GraduationCap, Trophy, FileText, Plus, Edit, Download } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

// Mock data
const mockExams = [
  {
    id: '1',
    course: 'Computer Science 101',
    title: 'Midterm Exam',
    date: '2024-02-15',
    time: '09:00 AM',
    duration: '3 hours',
    location: 'Room A-101',
    type: 'internal',
    status: 'scheduled'
  },
  {
    id: '2',
    course: 'Mathematics 201',
    title: 'Final Exam',
    date: '2024-02-20',
    time: '02:00 PM',
    duration: '3 hours',
    location: 'Hall B',
    type: 'final',
    status: 'scheduled'
  },
  {
    id: '3',
    course: 'Physics 101',
    title: 'Quiz 1',
    date: '2024-02-10',
    time: '11:00 AM',
    duration: '1 hour',
    location: 'Room C-205',
    type: 'quiz',
    status: 'completed'
  }
];

const mockGrades = [
  {
    id: '1',
    student: 'John Doe',
    studentId: 'STU2024001',
    course: 'Computer Science 101',
    exam: 'Midterm Exam',
    marks: 85,
    totalMarks: 100,
    grade: 'A-',
    gpa: 3.7
  },
  {
    id: '2',
    student: 'Jane Smith',
    studentId: 'STU2024002',
    course: 'Mathematics 201',
    exam: 'Final Exam',
    marks: 92,
    totalMarks: 100,
    grade: 'A',
    gpa: 4.0
  },
  {
    id: '3',
    student: 'Mike Johnson',
    studentId: 'STU2024003',
    course: 'Physics 101',
    exam: 'Quiz 1',
    marks: 78,
    totalMarks: 100,
    grade: 'B+',
    gpa: 3.3
  }
];

const mockTranscripts = [
  {
    id: '1',
    student: 'John Doe',
    studentId: 'STU2024001',
    semester: 'Fall 2024',
    cgpa: 3.75,
    totalCredits: 18,
    courses: [
      { code: 'CS101', name: 'Computer Science 101', credits: 3, grade: 'A-', gpa: 3.7 },
      { code: 'MATH201', name: 'Mathematics 201', credits: 4, grade: 'B+', gpa: 3.3 },
      { code: 'PHYS101', name: 'Physics 101', credits: 3, grade: 'A', gpa: 4.0 }
    ]
  }
];

export default function Exams() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedExam, setSelectedExam] = useState(null);
  const [gradeForm, setGradeForm] = useState({ marks: '', studentId: '', examId: '' });

  const handleScheduleExam = () => {
    toast({
      title: "Exam Scheduled",
      description: "The exam has been successfully scheduled.",
    });
  };

  const handleGradeEntry = () => {
    toast({
      title: "Grade Entered",
      description: "Student grade has been recorded successfully.",
    });
    setGradeForm({ marks: '', studentId: '', examId: '' });
  };

  const generateTranscript = (studentId: string) => {
    toast({
      title: "Transcript Generated",
      description: "Student transcript is being prepared for download.",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'scheduled':
        return <Badge variant="outline" className="text-university-blue">Scheduled</Badge>;
      case 'completed':
        return <Badge variant="default" className="bg-university-green text-white">Completed</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getGradeBadge = (grade: string) => {
    const isHighGrade = ['A+', 'A', 'A-'].includes(grade);
    return (
      <Badge variant={isHighGrade ? "default" : "secondary"} 
             className={isHighGrade ? "bg-university-green text-white" : ""}>
        {grade}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-university-navy">Exams & Grades</h1>
          <p className="text-muted-foreground">Manage examinations, grades, and academic performance</p>
        </div>
        {(user?.role === 'faculty' || user?.role === 'admin') && (
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-university-blue hover:bg-university-blue/90">
                <Plus className="h-4 w-4 mr-2" />
                Schedule Exam
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Schedule New Exam</DialogTitle>
                <DialogDescription>Create a new examination schedule</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="course">Course</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select course" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cs101">Computer Science 101</SelectItem>
                      <SelectItem value="math201">Mathematics 201</SelectItem>
                      <SelectItem value="phys101">Physics 101</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="title">Exam Title</Label>
                  <Input id="title" placeholder="e.g., Midterm Exam" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">Date</Label>
                    <Input id="date" type="date" />
                  </div>
                  <div>
                    <Label htmlFor="time">Time</Label>
                    <Input id="time" type="time" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="e.g., Room A-101" />
                </div>
                <Button onClick={handleScheduleExam} className="w-full">
                  Schedule Exam
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="gradient-border">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Calendar className="h-8 w-8 text-university-blue" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Upcoming Exams</p>
                <p className="text-2xl font-bold text-university-navy">12</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-border">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-university-green" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Average GPA</p>
                <p className="text-2xl font-bold text-university-navy">3.75</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-border">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Trophy className="h-8 w-8 text-university-gold" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Grades Entered</p>
                <p className="text-2xl font-bold text-university-navy">245</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-border">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <FileText className="h-8 w-8 text-university-purple" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Transcripts</p>
                <p className="text-2xl font-bold text-university-navy">89</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="exams" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="exams">Exam Schedule</TabsTrigger>
          <TabsTrigger value="grades">Grades & Results</TabsTrigger>
          <TabsTrigger value="transcripts">Transcripts</TabsTrigger>
        </TabsList>

        {/* Exam Schedule Tab */}
        <TabsContent value="exams" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Examination Schedule
              </CardTitle>
              <CardDescription>View and manage upcoming examinations</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course</TableHead>
                    <TableHead>Exam Title</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockExams.map((exam) => (
                    <TableRow key={exam.id}>
                      <TableCell className="font-medium">{exam.course}</TableCell>
                      <TableCell>{exam.title}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {exam.date}
                          <Clock className="h-4 w-4 ml-2" />
                          {exam.time}
                        </div>
                      </TableCell>
                      <TableCell>{exam.duration}</TableCell>
                      <TableCell>{exam.location}</TableCell>
                      <TableCell>{getStatusBadge(exam.status)}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <FileText className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Grades Tab */}
        <TabsContent value="grades" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Grade Entry Form */}
            {(user?.role === 'faculty' || user?.role === 'admin') && (
              <Card>
                <CardHeader>
                  <CardTitle>Enter Grades</CardTitle>
                  <CardDescription>Record student examination results</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="student">Student ID</Label>
                    <Input 
                      id="student" 
                      placeholder="Enter student ID"
                      value={gradeForm.studentId}
                      onChange={(e) => setGradeForm({...gradeForm, studentId: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="exam">Exam</Label>
                    <Select value={gradeForm.examId} onValueChange={(value) => setGradeForm({...gradeForm, examId: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select exam" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockExams.map((exam) => (
                          <SelectItem key={exam.id} value={exam.id}>
                            {exam.course} - {exam.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="marks">Marks Obtained</Label>
                    <Input 
                      id="marks" 
                      type="number" 
                      placeholder="Enter marks"
                      value={gradeForm.marks}
                      onChange={(e) => setGradeForm({...gradeForm, marks: e.target.value})}
                    />
                  </div>
                  <Button onClick={handleGradeEntry} className="w-full">
                    Submit Grade
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Recent Grades */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Grades</CardTitle>
                <CardDescription>Latest examination results</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockGrades.slice(0, 5).map((grade) => (
                    <div key={grade.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">{grade.student}</p>
                        <p className="text-sm text-muted-foreground">{grade.course}</p>
                        <p className="text-sm text-muted-foreground">{grade.exam}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2">
                          <span className="font-bold">{grade.marks}/{grade.totalMarks}</span>
                          {getGradeBadge(grade.grade)}
                        </div>
                        <p className="text-sm text-muted-foreground">GPA: {grade.gpa}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* All Grades Table */}
          <Card>
            <CardHeader>
              <CardTitle>All Grades</CardTitle>
              <CardDescription>Complete list of student grades</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Exam</TableHead>
                    <TableHead>Marks</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead>GPA</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockGrades.map((grade) => (
                    <TableRow key={grade.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{grade.student}</p>
                          <p className="text-sm text-muted-foreground">{grade.studentId}</p>
                        </div>
                      </TableCell>
                      <TableCell>{grade.course}</TableCell>
                      <TableCell>{grade.exam}</TableCell>
                      <TableCell>{grade.marks}/{grade.totalMarks}</TableCell>
                      <TableCell>{getGradeBadge(grade.grade)}</TableCell>
                      <TableCell>{grade.gpa}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Transcripts Tab */}
        <TabsContent value="transcripts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Student Transcripts
              </CardTitle>
              <CardDescription>Generate and download academic transcripts</CardDescription>
            </CardHeader>
            <CardContent>
              {mockTranscripts.map((transcript) => (
                <div key={transcript.id} className="border rounded-lg p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{transcript.student}</h3>
                      <p className="text-muted-foreground">{transcript.studentId} • {transcript.semester}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-university-navy">CGPA: {transcript.cgpa}</p>
                      <p className="text-sm text-muted-foreground">Credits: {transcript.totalCredits}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">Course Details</h4>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Course Code</TableHead>
                          <TableHead>Course Name</TableHead>
                          <TableHead>Credits</TableHead>
                          <TableHead>Grade</TableHead>
                          <TableHead>GPA</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {transcript.courses.map((course, idx) => (
                          <TableRow key={idx}>
                            <TableCell>{course.code}</TableCell>
                            <TableCell>{course.name}</TableCell>
                            <TableCell>{course.credits}</TableCell>
                            <TableCell>{getGradeBadge(course.grade)}</TableCell>
                            <TableCell>{course.gpa}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  <div className="flex justify-end">
                    <Button 
                      onClick={() => generateTranscript(transcript.studentId)}
                      className="flex items-center gap-2"
                    >
                      <Download className="h-4 w-4" />
                      Download Transcript
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}