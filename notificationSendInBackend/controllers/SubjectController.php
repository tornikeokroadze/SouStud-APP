<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Subject;
use App\Models\User;

class SubjectController extends Controller
{
    public function index(Request $request)
    {   

        $subjects = Subject::get();


        $data = array(
            'subjects' => $subjects,
        );
        
        return view('subject.index')->with($data);
    }

    public function update(Request $request)  //$id
    {
        $grades = $request->input('grade');
       
        // $subject =  Subject::findOrFail($id);
        // $subject->grade = $grade;
        // $subject->save();

         foreach ($grades as $id => $grade) {
            $subject = Subject::findOrFail($id);
            $subject->grade = $grade;
            $subject->save();
        }


        return redirect('/subject')->with('success', 'Grade updated successfully');
    }
}
