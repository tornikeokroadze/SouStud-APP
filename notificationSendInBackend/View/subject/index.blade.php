<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title></title>

	<style type="text/css">
		.innerContainer{
			display: flex;
			flex-direction: row;
			align-items: center;
			gap: 20px;
		}
	</style>
</head>
<body>
	<div class="container">
		

		<form action="{{ route('subject.update') }}" method="POST">
			@csrf
			@method('PUT')

			@foreach($subjects as $subject)
				<div class="innerContainer">
					<h4>{{ $subject->user->name }}</h4>
					<p>{{ $subject->title }}</p>
					<input name="grade[{{ $subject->id }}]" value="{{ $subject->grade }}" type="number" />
				</div>
			@endforeach

			<button type="submit">Update Grades</button>
		</form>

	</div>
</body>
</html>